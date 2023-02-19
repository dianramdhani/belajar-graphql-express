import express from 'express'
import { GraphQLSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'
import query from './resolvers/query.js'

const port = process.env.PORT || 5678
const server = express()
const schema = new GraphQLSchema({ query })

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
