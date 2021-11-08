const gql = async (operation: string, variables: {}) => {
  const fetchResponse = await fetch(
    `${process.env.HASURA_GRAPHQL_ENDPOINT}/v1/graphql`,
    {
      method: 'POST',
      headers: {
        'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
      },
      body: JSON.stringify({
        query: operation,
        variables,
      }),
    }
  )
  const data = await fetchResponse.json()
  return data
}

export default gql
