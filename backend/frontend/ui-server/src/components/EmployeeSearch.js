import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_EMPLOYEES } from '../graphql/queries';

const EmployeeSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const { loading, error, data } = useQuery(GET_ALL_EMPLOYEES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const employees = data?.employees || [];

  const filteredEmployees = employees.filter((employee) => {
    const searchMatch = searchTerm
      ? (employee.firstName && employee.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (employee.lastName && employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()))
      : true;
    const departmentMatch = filterDepartment
      ? employee.department && employee.department.toLowerCase() === filterDepartment.toLowerCase()
      : true;
    return searchMatch && departmentMatch;
  });

  return (
    <div>
      <h2>Search Employees</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        value={filterDepartment}
        onChange={(e) => setFilterDepartment(e.target.value)}
      >
        <option value="">All Departments</option>
        <option value="IT">IT</option>
        <option value="Engineering">Engineering</option>
        <option value="HR">HR</option>
        <option value="Marketing">Marketing</option>
        {/* Add more departments as needed */}
      </select>
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
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.age}</td>
                <td>{new Date(employee.dateOfJoining).toLocaleDateString()}</td>
                <td>{employee.title}</td>
                <td>{employee.department}</td>
                <td>{employee.employeeType}</td>
                <td>{employee.currentStatus ? 'Active' : 'Inactive'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeSearch;
