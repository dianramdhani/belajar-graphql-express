const { default: axios } = require('axios')
const { buildSchema, graphql } = require('graphql')

const schema = buildSchema(`
    type Post {
        id: ID
        title: String
        body: String
    }

    type Query {
        posts(search: String): [Post]
    }

    type Schema {
        query: Query
    }
`)

const rootValue = {
  posts: async (params) => {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    )
    if (params.search) {
      const { search } = params
      return data.filter(
        ({ title, body }) => title.includes(search) || body.includes(search)
      )
    }
    return data
  },
}

// const source = `
//   query {
//     posts {
//         id
//         title
//         body
//     }
//   }
// `

const source = `
  query {
    posts(search:"eum") {
        id
        title
        body
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
