import React from 'react';

const formatDate = (dateString) => {
  // Check if dateString is a valid ISO date string
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Formats to MM/DD/YYYY or your locale's default format
};

const EmployeeTable = ({ employees }) => (
  <div className="table-container">
    <h2>Employee Table</h2>
    <table>
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
        </tr>
      </thead>
      <tbody>
        {employees.map(employee => (
          <tr key={employee.id}>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.age}</td>
            <td>{formatDate(employee.dateOfJoining)}</td>
            <td>{employee.title}</td>
            <td>{employee.department}</td>
            <td>{employee.employeeType}</td>
            <td>{employee.currentStatus ? 'Active' : 'Inactive'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EmployeeTable;
