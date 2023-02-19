import { GraphQLObjectType } from 'graphql'
import user from './user.js'
import users from './users.js'

const query = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of query type',
  fields: {
    user,
    users,
  },
})

export default query
