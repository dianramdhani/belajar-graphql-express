const { buildSchema, graphql } = require('graphql')

const schema = buildSchema(`
    type Query {
        greeting: Float
    }

    type Schema {
        query: Query
    }
`)

const rootValue = {
  greeting: () => 3.14,
}

const source = `
  query {
    greeting
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
