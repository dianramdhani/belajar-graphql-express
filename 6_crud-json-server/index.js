const { default: axios } = require('axios')
const { buildSchema, graphql } = require('graphql')
const url = 'http://localhost:1234'

const schema = buildSchema(`
    type User {
      id: ID
      name: String
      email: String
      address: String
    }

    type Query {
      user(
        id: ID
        search: String
      ): User
      users(search:String): [User]
    }

    type Schema {
        query: Query
    }
`)

const rootValue = {
  users: async ({ search }) => {
    const { data } = await axios.get(`${url}/users`)
    if (search)
      return data.filter(
        ({ name, email }) => name.includes(search) || email.includes(search)
      )
    return data
  },
  user: async ({ id, search }) => {
    if (id) {
      const { data } = await axios.get(`${url}/users/${id}`)
      return data
    }
    if (search) {
      const { data } = await axios.get(`${url}/users`)
      return data.find(
        ({ name, email }) => name.includes(search) || email.includes(search)
      )
    }
    return undefined
  },
}

// const source = `
//   {
//     user(search:"Fauzan") {
//       id
//       name
//       email
//       address
//     }
//   }
// `

// const source = `
//   {
//     user(id:1) {
//       id
//       name
//       email
//       address
//     }
//   }
// `

// const source = `
//   {
//     users(search:"Dian") {
//       id
//       name
//       email
//       address
//     }
//   }
// `

const source = `
  {
    users {
      id
      name
      email
      address
    }
  }
`

async function main() {
  try {
    const result = await graphql({
      schema,
      source,
      rootValue,
    })
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}
main()
