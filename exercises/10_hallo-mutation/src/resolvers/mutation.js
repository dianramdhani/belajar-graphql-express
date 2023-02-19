import { GraphQLObjectType } from 'graphql'
import createUser from './user/createUser.js'

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root of mutation type',
  fields: {
    createUser,
  },
})

export default mutation
