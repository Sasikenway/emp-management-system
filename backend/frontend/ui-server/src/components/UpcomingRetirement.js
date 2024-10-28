import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_EMPLOYEES } from '../graphql/queries';
import { Table, Form } from 'react-bootstrap';

const UpcomingRetirement = () => {
  const [filterEmployeeType, setFilterEmployeeType] = useState('');
  const { loading, error, data } = useQuery(GET_ALL_EMPLOYEES);

  const retirementAge = 65;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const employees = data?.employees || [];

  const upcomingRetirementDate = (joiningDate) => {
    const joiningDateObj = new Date(joiningDate);
    const retirementDate = new Date(joiningDateObj.setFullYear(joiningDateObj.getFullYear() + retirementAge));
    return retirementDate;
  };

  const isUpcomingRetirement = (joiningDate) => {
    const retirementDate = upcomingRetirementDate(joiningDate);
    const today = new Date();
    const sixMonthsFromNow = new Date(today.setMonth(today.getMonth() + 6));
    return retirementDate <= sixMonthsFromNow && retirementDate > today;
  };

  const calculateTimeUntilRetirement = (joiningDate) => {
    const retirementDate = upcomingRetirementDate(joiningDate);
    const today = new Date();
    const years = retirementDate.getFullYear() - today.getFullYear();
    const months = retirementDate.getMonth() - today.getMonth();
    const days = retirementDate.getDate() - today.getDate();

    return { years, months, days };
  };

  const filteredEmployees = employees.filter(employee => {
    if (filterEmployeeType && employee.employeeType !== filterEmployeeType) {
      return false;
    }
    return isUpcomingRetirement(employee.dateOfJoining);
  });

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); // Formats to MM/DD/YYYY or your locale's default format
  };

  return (
    <div>
      <h2>Upcoming Retirement</h2>
      <Form.Group controlId="formFilterEmployeeType">
        <Form.Label>Filter by Employee Type</Form.Label>
        <Form.Control
          as="select"
          value={filterEmployeeType}
          onChange={(e) => setFilterEmployeeType(e.target.value)}
        >
          <option value="">All Employee Types</option>
          <option value="FullTime">Full Time</option>
          <option value="PartTime">Part Time</option>
          <option value="Contract">Contract</option>
          <option value="Seasonal">Seasonal</option>
        </Form.Control>
      </Form.Group>
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
            <th>Years Left</th>
            <th>Months Left</th>
            <th>Days Left</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => {
              const { years, months, days } = calculateTimeUntilRetirement(employee.dateOfJoining);
              return (
                <tr key={employee.id}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.age}</td>
                  <td>{formatDate(employee.dateOfJoining)}</td>
                  <td>{employee.title}</td>
                  <td>{employee.department}</td>
                  <td>{employee.employeeType}</td>
                  <td>{employee.currentStatus ? 'Active' : 'Inactive'}</td>
                  <td>{years}</td>
                  <td>{months}</td>
                  <td>{days}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="11">No employees found with upcoming retirement</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default UpcomingRetirement;
