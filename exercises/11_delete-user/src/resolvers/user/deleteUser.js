import axios from 'axios'
import { GraphQLID, GraphQLNonNull } from 'graphql'
import userType from '../../schemas/userType.js'

const dataUrl = 'http://localhost:1234'
const args = {
  id: {
    type: new GraphQLNonNull(GraphQLID),
    description: 'User ID',
  },
}
const resolve = async (_, { id }) => {
  try {
    const { data } = await axios.get(`${dataUrl}/users/${id}`)
    await axios.delete(`${dataUrl}/users/${id}`)
    return data
  } catch (error) {
    throw new Error('User not found')
  }
}

export default {
  type: userType,
  args,
  resolve,
}
