import axios from 'axios'
import { GraphQLNonNull, GraphQLString } from 'graphql'
import { v4 as uuid } from 'uuid'
import userType from '../../schemas/userType.js'

const dataUrl = 'http://localhost:1234'
const args = {
  name: {
    type: new GraphQLNonNull(GraphQLString),
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
}
const resolve = async (_, { name, email, address }) => {
  const id = uuid()
  await axios.post(`${dataUrl}/users`, { id, name, email, address })
  return { id, name, email, address }
}

export default {
  type: userType,
  args,
  resolve,
}
