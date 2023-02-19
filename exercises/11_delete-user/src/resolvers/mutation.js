import { GraphQLObjectType } from 'graphql'
import createUser from './user/createUser.js'
import deleteUser from './user/deleteUser.js'

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root of mutation type',
  fields: {
    createUser,
    deleteUser,
  },
})

export default mutation
