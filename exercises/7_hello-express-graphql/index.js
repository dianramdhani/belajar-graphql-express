const { default: axios } = require('axios')
const { buildSchema } = require('graphql')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const port = process.env.PORT || 5678
const server = express()
const dataUrl = 'http://localhost:1234'

const schema = buildSchema(`
    type User {
      id: ID
      name: String
      email: String
      address: String
    }

    type Query {
      user(
        id: ID
        search: String
      ): User
      users(search:String): [User]
    }

    type Schema {
        query: Query
    }
`)

const rootValue = {
  users: async ({ search }) => {
    const { data } = await axios.get(`${dataUrl}/users`)
    if (search)
      return data.filter(
        ({ name, email }) => name.includes(search) || email.includes(search)
      )
    return data
  },
  user: async ({ id, search }) => {
    if (id) {
      const { data } = await axios.get(`${dataUrl}/users/${id}`)
      return data
    }
    if (search) {
      const { data } = await axios.get(`${dataUrl}/users`)
      return data.find(
        ({ name, email }) => name.includes(search) || email.includes(search)
      )
    }
    return undefined
  },
}

server.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
)

server.listen(port, () =>
  console.log(`Server running at http://localhost:${port}/graphql`)
)
