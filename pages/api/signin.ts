import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import gql from '@/utils/gql-request'
import sgMail from '@/utils/sendgrid-mail'
import validateEmail from '@/utils/validate-email'
import getRandomInt from '@/utils/random-integer'

// check if the account exists and is active
const GET_USER = `
query GetUser($email: String!) {
  user(where: {email: {_eq: $email}}) {
    id
    is_active
    code_tries
    code_expires_at
  }
}
`

// create or update user with code dataset to sign in
const CREATE_UPDATE_USER = `
mutation CreateUpdateUser($object: user_insert_input!, $on_conflict: user_on_conflict!) {
  insert_user_one(object: $object, on_conflict: $on_conflict) {
    id
    is_active
    code_tries
    code_expires_at
  }
}
`

// main function
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // get request input
  const { email } = req.body.input

  // validate email before all
  const isValidEmail = await validateEmail(email)

  // if email is not valid
  if (!isValidEmail) {
    return res.status(401).json({
      status: 'error',
      message: 'Please, enter a valid email address',
    })
  }

  // check if user exists and get user data
  let gqlData

  try {
    gqlData = await gql(GET_USER, { email })

    // if Hasura operation contains errors, then throw error
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

  if (user) {
    // if user exists but isn't active, then throw error
    if (!user.is_active) {
      return res.status(401).json({
        status: 'error',
        message: 'This account is no longer active',
      })
    }

    // convert the timestamp from ISO to number and get the difference transformed into seconds
    const expirationTimer =
      (new Date(user.code_expires_at).getTime() - new Date().getTime()) / 1000

    // then extract information to auxiliary variable
    const needToWait = expirationTimer > 3600 - 60 * 5 // 5 minutes delay

    // if user exists and code has not reached the wait delay, then throw error
    if (needToWait) {
      return res.status(401).json({
        status: 'error',
        message: 'Wait a few minutes before requesting the code again',
      })
    }
  }

  // all checks passed and a code must be sent, so generate a new code
  const code = getRandomInt(100000, 999999).toString()

  // create or update user with code dataset
  const createUpdateUser = {
    object: {
      email,
      is_active: true,
      code: await bcrypt.hash(code, 12),
      code_tries: 0,
      code_expires_at: new Date(
        new Date().getTime() + 1000 * 60 * 60 // 60 minutes expiration
      ).toISOString(),
    },
    on_conflict: {
      constraint: 'user_email_key',
      update_columns: ['code', 'code_tries', 'code_expires_at'],
    },
  }

  try {
    gqlData = await gql(CREATE_UPDATE_USER, createUpdateUser)

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

  // send email to user with his validation code
  const mailResult = await sgMail({
    from: `Compartilha.org <${process.env.SENDGRID_SIGNIN_EMAIL_FROM}>`,
    to: email,
    subject: 'Olá! Este é o seu código para entrar em Compartilha.org',
    template_id: process.env.SENDGRID_SIGNIN_TEMPLATE_ID,
    dynamic_template_data: {
      auth_code: code,
      auth_page: `https://compartilha.org/signin?email=${email}`,
    },
  })

  // if email was sent successfully, then return success
  if (mailResult.statusText === 'Accepted') {
    return res.status(200).json({
      status: 'success',
      message: 'The access code has been sent to your email',
    })
  } else {
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong, try again later',
    })
  }
}
