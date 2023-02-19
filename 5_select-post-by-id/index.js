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
        post(id: ID): Post
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
  post: async (params) => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${params.id}`
    )
    return data
  },
}

const source = `
  {
    post(id: 3) {
      id
      title
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
