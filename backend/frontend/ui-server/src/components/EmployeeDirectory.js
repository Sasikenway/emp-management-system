import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_EMPLOYEES } from '../graphql/queries';
import { DELETE_EMPLOYEE } from '../graphql/mutations';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Formats to MM/DD/YYYY or your locale's default format
};

const EmployeeDirectory = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_EMPLOYEES);
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const employees = data?.employees || [];

  const handleDelete = async (id, currentStatus) => {
    if (currentStatus) {
      alert("CAN'T DELETE EMPLOYEE – STATUS ACTIVE");
      return;
    }

    try {
      await deleteEmployee({ variables: { id } });
      refetch(); // Refetch the data after deletion
    } catch (err) {
      console.error("Error deleting employee:", err.message);
    }
  };

  return (
    <div>
      <h2>Employee Directory</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Date of Joining</th>
            <th>Title</th>
            <th>Department</th>
            <th>Employee Type</th>
            <th>Current Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.age}</td>
                <td>{formatDate(employee.dateOfJoining)}</td>
                <td>{employee.title}</td>
                <td>{employee.department}</td>
                <td>{employee.employeeType}</td>
                <td>{employee.currentStatus ? 'Active' : 'Inactive'}</td>
                <td>
                  <Link to={`/employee-details/${employee.id}`}>
                    <Button variant="info" size="sm" className="mr-2">View Details</Button>
                  </Link>
                  <Link to={`/employee-edit/${employee.id}`}>
                    <Button variant="primary" size="sm" className="mr-2">Edit</Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(employee.id, employee.currentStatus)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No employees found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default EmployeeDirectory;
