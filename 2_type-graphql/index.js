const { buildSchema, graphql } = require('graphql')

const schema = buildSchema(`
    type Comment {
        id: ID
        content: String
    }

    type Query {
        title: String
        duration: Int
        watched: Boolean
        comments: [Comment]
    }

    type Schema {
        query: Query
    }
`)

const rootValue = {
  title: 'The Matrix',
  duration: 120,
  watched: true,
  comments: [
    {
      id: 1,
      content: 'This is a comment',
    },
  ],
}

const source = `
  query {
    title
    duration
    watched
    comments {
        id
        content
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
