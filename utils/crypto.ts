import AES from 'crypto-js/aes'
import utf8 from 'crypto-js/enc-utf8'

const encrypt = (data: string) => {
  return AES.encrypt(data, process.env.HASURA_GRAPHQL_ADMIN_SECRET).toString()
}

const decrypt = (ciphertext: string) => {
  const bytes = AES.decrypt(
    ciphertext,
    process.env.HASURA_GRAPHQL_ADMIN_SECRET
  )
  const decryptedData = bytes.toString(utf8)
  return decryptedData
}

export { encrypt, decrypt }
