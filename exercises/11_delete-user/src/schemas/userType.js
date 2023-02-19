import { GraphQLID, GraphQLString, GraphQLObjectType } from 'graphql'

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

export default userType
