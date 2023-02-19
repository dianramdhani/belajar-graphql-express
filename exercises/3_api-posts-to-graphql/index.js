const { default: axios } = require('axios')
const { buildSchema, graphql } = require('graphql')

const schema = buildSchema(`
    type Post {
        id: ID
        title: String
        body: String
    }

    type Query {
        posts: [Post]
    }

    type Schema {
        query: Query
    }
`)

const rootValue = {
  posts: async () => {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    )
    return data
  },
}

const source = `
  query {
    posts {
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
