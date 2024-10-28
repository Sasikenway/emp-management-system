import { gql } from '@apollo/client';

// Mutation for creating an employee
export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($firstName: String!, $lastName: String!, $age: Int!, $dateOfJoining: String!, $title: String!, $department: String!, $employeeType: String!) {
    createEmployee(firstName: $firstName, lastName: $lastName, age: $age, dateOfJoining: $dateOfJoining, title: $title, department: $department, employeeType: $employeeType) {
      id
      firstName
      lastName
    }
  }
`;

// Mutation for updating an employee
export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!
    $title: String
    $department: String
    $employeeType: String
    $currentStatus: Boolean
    $dateOfJoining: String
  ) {
    updateEmployee(
      id: $id
      title: $title
      department: $department
      employeeType: $employeeType
      currentStatus: $currentStatus
      dateOfJoining: $dateOfJoining
    ) {
      id
      title
      department
      employeeType
      currentStatus
      dateOfJoining
    }
  }
`;

// Mutation for deleting an employee
export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      id
    }
  }
`;
