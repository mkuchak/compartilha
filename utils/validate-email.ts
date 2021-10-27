// validate email address
const validateEmail = async (email: string) => {
  const regex =
    /^(([^<>()\[\]\\.,;:+\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  try {
    const checkEmail = await fetch(
      `https://verifier.meetchopra.com/verify/${email}?token=${process.env.MEETCHOPRA_API_KEY}`
    )
    const checkEmailResult = await checkEmail.json()

    // regex and external api validation
    return regex.test(String(email).toLowerCase()) && checkEmailResult.status
  } catch (e) {
    console.error(e)
    return regex.test(String(email).toLowerCase())
  }
}

export default validateEmail
