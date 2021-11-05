import type { NextApiRequest, NextApiResponse } from 'next'
import { decrypt } from '@/utils/crypto'
import setCookie from '@/utils/cookies'
import gql from '@/utils/gql-request'

// delete refresh token to sign out
const DELETE_REFRESH_TOKEN = `
mutation DeleteRefreshToken($refresh_token: uuid!) {
  delete_refresh_token(where: {refresh_token: {_eq: $refresh_token}}) {
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
      message: 'You already logged out',
    })
  }

  // decrypt refresh token dataset
  const { refreshToken } = JSON.parse(decrypt(refreshTokenDataset))

  // delete refresh token from database
  try {
    let gqlData = await gql(DELETE_REFRESH_TOKEN, {
      refresh_token: refreshToken,
    })

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

  // delete refresh token from cookie
  setCookie(res, 'refreshToken', '', {
    maxAge: -1,
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: process.env.APP_ENV === 'production',
  })

  // if no errors, return success
  return res.status(200).json({
    status: 'success',
    message: 'Logged out successfully',
  })
}
