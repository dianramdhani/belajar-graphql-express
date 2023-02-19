import axios from 'axios'
import { GraphQLList, GraphQLString } from 'graphql'
import userType from '../schemas/userType.js'

const dataUrl = 'http://localhost:1234'
const args = {
  search: {
    type: GraphQLString,
    description: 'Search value',
  },
}
const resolve = async (_, { search }) => {
  const { data } = await axios.get(`${dataUrl}/users`)
  if (search)
    return data.filter(
      ({ name, email }) => name.includes(search) || email.includes(search)
    )
  return data
}

export default {
  type: new GraphQLList(userType),
  args,
  resolve,
}
