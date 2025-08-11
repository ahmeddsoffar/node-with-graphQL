//structue of my data

const { gql } = require("graphql-tag");

//id da identifier gdeed  "!" m3na non nullable filled

const typeDefs = gql`
  type Product {
    id: ID!
    title: String!
    category: String!
    price: Float!
    inStock: Boolean!
  }

  enum SortOrder {
    ASC
    DESC
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
    sortedProducts(field: String!, order: SortOrder = ASC): [Product!]!
  }

  type Mutation {
    addProduct(
      title: String!
      category: String!
      price: Float!
      inStock: Boolean!
    ): Product!
    updateProduct(
      id: ID!
      title: String
      category: String
      price: Float
      inStock: Boolean
    ): Product!
    deleteProduct(id: ID!): Boolean!
  }
`;

module.exports = { typeDefs };
