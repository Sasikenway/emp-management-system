const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    age: Int!
    dateOfJoining: String!
    title: String!
    department: String!
    employeeType: String!
    currentStatus: Boolean!
  }

  type Query {
    employees(search: String): [Employee]
    getEmployeeById(id: ID!): Employee
  }

  type Mutation {
    createEmployee(
      firstName: String!
      lastName: String!
      age: Int!
      dateOfJoining: String!
      title: String!
      department: String!
      employeeType: String!
      currentStatus: Boolean
    ): Employee

    updateEmployee(
      id: ID!
      title: String
      department: String
      employeeType: String
      currentStatus: Boolean
      dateOfJoining: String
    ): Employee

    deleteEmployee(id: ID!): Employee
  }
`;

module.exports = { typeDefs };
