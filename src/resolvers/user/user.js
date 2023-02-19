import axios from 'axios'
import { GraphQLID, GraphQLString } from 'graphql'
import userType from '../../schemas/userType.js'

const dataUrl = 'http://localhost:1234'
const args = {
  id: {
    type: GraphQLID,
    description: 'User ID',
  },
  search: {
    type: GraphQLString,
    description: 'Search value',
  },
}
const resolve = async (_, { id, search }) => {
  if (id) {
    const { data } = await axios.get(`${dataUrl}/users/${id}`)
    return data
  }
  if (search) {
    const { data } = await axios.get(`${dataUrl}/users`)
    return data.find(
      ({ name, email }) =>
        String(name).includes(search) || String(email).includes(search)
    )
  }
  return undefined
}

export default {
  type: userType,
  args,
  resolve,
}
