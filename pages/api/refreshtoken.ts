import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'
import { sign } from 'jsonwebtoken'
import { encrypt, decrypt } from '@/utils/crypto'
import setCookie from '@/utils/cookies'
import gql from '@/utils/gql-request'

const UPDATE_REFRESH_TOKEN = `
mutation UpdateRefreshToken($where: refresh_token_bool_exp!, $_set: refresh_token_set_input) {
  update_refresh_token(where: $where, _set: $_set) {
    returning {
      id
      refresh_token
      user_agent
      last_ip
      expires_at
      created_at
      updated_at
    }
  }
}
`

const DELETE_REFRESH_TOKEN = `
mutation DeleteRefreshToken($where: refresh_token_bool_exp!) {
  delete_refresh_token(where: $where) {
    returning {
      id
      refresh_token
    }
  }
}
`

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { refreshToken: inputRefreshToken } = req.body.input
  const { refreshToken: cookieRefreshToken } = req.cookies

  // get refresh token dataset preferably from the input
  const refreshTokenDataset = inputRefreshToken || cookieRefreshToken

  // check if refresh token dataset was sent in body or cookie
  if (!refreshTokenDataset) {
    return res.status(401).json({
      status: 'error',
      message: 'No refresh token provided',
    })
  }

  // decrypt refresh token dataset
  const { userId, refreshToken, expiresAt } = JSON.parse(
    decrypt(refreshTokenDataset)
  )

  // check if user code is expired
  const expirationTimer = expiresAt - new Date().getTime()
  const isExpired = expirationTimer < 0

  let gqlData

  if (isExpired) {
    // delete expired refresh token in database
    const deleteRefreshToken = {
      where: {
        refresh_token: {
          _eq: refreshToken,
        },
      },
    }

    try {
      gqlData = await gql(DELETE_REFRESH_TOKEN, deleteRefreshToken)

      // in case of errors
      if (gqlData.errors) {
        return res.status(400).json(gqlData.errors[0])
      }
    } catch (e) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      })
    }

    return res.status(401).json({
      status: 'error',
      message: 'The refresh token has expired, please sign in again',
    })
  }

  // generate new refresh token
  const newRefreshToken = uuidv4()

  // update refresh token in database
  const updateRefreshToken = {
    where: {
      refresh_token: {
        _eq: refreshToken,
      },
    },
    _set: {
      refresh_token: newRefreshToken,
      user_agent: req.headers['x-forwarded-user-agent'],
      last_ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      updated_at: new Date(new Date().getTime()).toISOString(),
    },
  }

  try {
    gqlData = await gql(UPDATE_REFRESH_TOKEN, updateRefreshToken)

    // in case of errors
    if (gqlData.errors) {
      return res.status(400).json(gqlData.errors[0])
    }
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }

  const isRefreshTokenUpdated = gqlData.data.update_refresh_token.returning[0]

  if (!isRefreshTokenUpdated) {
    return res.status(401).json({
      status: 'error',
      message: 'The refresh token is invalid',
    })
  }

  // create new refresh token dataset
  const newRefreshTokenDataset = encrypt(
    JSON.stringify({
      userId,
      refreshToken: newRefreshToken,
      expiresAt,
    })
  )

  // update refresh token dataset cookie
  setCookie(res, 'refreshToken', newRefreshTokenDataset, {
    maxAge: expirationTimer,
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: process.env.APP_ENV === 'production',
  })

  // extract jwt settings from environment variables
  const { key, type } = JSON.parse(process.env.HASURA_GRAPHQL_JWT_SECRET)

  // create access token (jwt)
  const accessToken = sign(
    {
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['admin'],
        'x-hasura-default-role': 'admin',
      },
    },
    key,
    {
      algorithm: type,
      expiresIn: `${parseInt(
        process.env.HASURA_GRAPHQL_ACCESS_TOKEN_EXPIRES_IN
      )}m`,
    }
  )

  // if successful, return the new access token and new refresh token with a success message
  return res.status(200).json({
    token: {
      accessToken,
      refreshToken: newRefreshTokenDataset,
    },
    status: 'success',
    message: 'You have successfully logged in',
  })
}
