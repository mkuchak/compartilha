import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { sign } from 'jsonwebtoken'
import { encrypt } from '@/utils/crypto'
import setCookie from '@/utils/cookies'
import gql from '@/utils/gql-request'

// check if the account exists and is active
const GET_USER = `
query GetUser($email: String!) {
  user(where: {email: {_eq: $email}}) {
    id
    is_active
    code
    code_tries
    code_expires_at
  }
}
`

// if code is wrong, increment code_tries
const INC_USER_ATTEMPTS = `
mutation IncrementUserAttempts($email: String!) {
  update_user(where: {email: {_eq: $email}}, _inc: {code_tries: 1}) {
    returning {
      id
      code_tries
    }
  }
}
`

// update code settings and create refresh token
const UPDATE_USER_CREATE_REFRESH_TOKEN = `
mutation UpdateUserCreateRefreshToken($object: user_insert_input!, $on_conflict: user_on_conflict!) {
  insert_user_one(object: $object, on_conflict: $on_conflict) {
    id
    email
    refresh_tokens {
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

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // get request input
  const { email, code } = req.body.input.credentials

  // get user by email
  let gqlData

  try {
    gqlData = await gql(GET_USER, { email })

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

  let user = gqlData.data.user[0]

  // check if user exists
  if (!user) {
    // to avoid identifying an existing user, we purposely send an ambiguous message
    return res.status(401).json({
      status: 'error',
      message: 'Incorrect code, try again',
    })
  }

  // check if user is active
  if (!user.is_active) {
    return res.status(401).json({
      status: 'error',
      message: 'This account is no longer active',
    })
  }

  // check if user code tries is less than 10
  const isMaxAttempts = user.code_tries >= 10

  if (isMaxAttempts) {
    return res.status(401).json({
      status: 'error',
      message:
        'You have reached the maximum number of attempts, please request to send an email with a new code',
    })
  }

  // check if user code is expired
  const expirationTimer =
    new Date(user.code_expires_at).getTime() - new Date().getTime()
  const isExpired = expirationTimer < 0

  if (isExpired) {
    return res.status(401).json({
      status: 'error',
      message:
        'The code has expired, please request to send an email with a new code',
    })
  }

  // check if user code match with the one in the database (like a password)
  const isCodeValid = await bcrypt.compare(code, user.code)

  if (!isCodeValid) {
    // increment user code tries
    try {
      gqlData = await gql(INC_USER_ATTEMPTS, { email })

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
      message: 'Incorrect code, try again',
    })
  }

  // all checks passed, so generate a new refresh token
  const refreshToken = uuidv4()

  // reset user code settings and create refresh token
  const updateUserCreateRefreshToken = {
    object: {
      email,
      code_tries: 0,
      code_expires_at: new Date().toISOString(),
      refresh_tokens: {
        data: {
          refresh_token: refreshToken,
          user_agent: req.headers['x-forwarded-user-agent'],
          last_ip:
            req.headers['x-forwarded-for'] || req.connection.remoteAddress,
          expires_at: new Date(
            new Date().getTime() +
              1000 *
                60 *
                parseInt(process.env.HASURA_GRAPHQL_REFRESH_TOKEN_EXPIRES_IN)
          ).toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      },
    },
    on_conflict: {
      constraint: 'user_email_key',
      update_columns: ['code_tries', 'code_expires_at'],
    },
  }

  try {
    gqlData = await gql(
      UPDATE_USER_CREATE_REFRESH_TOKEN,
      updateUserCreateRefreshToken
    )

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

  // create refresh token dataset
  const refreshTokenDataset = encrypt(
    JSON.stringify({
      userId: user.id,
      refreshToken: refreshToken,
      expiresAt:
        new Date().getTime() +
        1000 *
          60 *
          parseInt(process.env.HASURA_GRAPHQL_REFRESH_TOKEN_EXPIRES_IN),
    })
  )

  // set cookie for refresh token
  setCookie(res, 'refreshToken', refreshTokenDataset, {
    maxAge:
      parseInt(process.env.HASURA_GRAPHQL_REFRESH_TOKEN_EXPIRES_IN) * 60 * 1000, // convert from minute to milliseconds
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
        'x-hasura-allowed-roles': ['user'],
        'x-hasura-default-role': 'user',
        'x-hasura-user-id': `${user.id}`,
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

  // if successful, return the access token and refresh token with a success message
  return res.status(200).json({
    token: {
      accessToken,
      refreshToken: refreshTokenDataset,
    },
    status: 'success',
    message: 'You have successfully logged in',
  })
}
