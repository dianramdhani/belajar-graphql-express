import express from 'express'
import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'
import users from './resolvers/users.js'
import user from './resolvers/user.js'

const port = process.env.PORT || 5678
const server = express()

const queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of query type',
  fields: {
    user,
    users,
  },
})

const schema = new GraphQLSchema({
  query: queryType,
})

server.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
)

server.listen(port, () =>
  console.log(`Server running at http://localhost:${port}/graphql`)
)
