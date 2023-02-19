const { default: axios } = require('axios')
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require('graphql')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const port = process.env.PORT || 5678
const server = express()
const dataUrl = 'http://localhost:1234'

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'User',
  fields: {
    id: {
      type: GraphQLID,
      description: 'User ID',
    },
    name: {
      type: GraphQLString,
      description: 'User name',
    },
    email: {
      type: GraphQLString,
      description: 'User email',
    },
    address: {
      type: GraphQLString,
      description: 'User address',
    },
  },
})

const queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of query type',
  fields: {
    user: {
      type: userType,
      args: {
        id: {
          type: GraphQLID,
          description: 'User ID',
        },
        search: {
          type: GraphQLString,
          description: 'Search value',
        },
      },
      resolve: async (_, { id, search }) => {
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
    },
    users: {
      type: new GraphQLList(userType),
      args: {
        search: {
          type: GraphQLString,
          description: 'Search value',
        },
      },
      resolve: async (_, { search }) => {
        const { data } = await axios.get(`${dataUrl}/users`)
        if (search)
          return data.filter(
            ({ name, email }) => name.includes(search) || email.includes(search)
          )
        return data
      },
    },
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
