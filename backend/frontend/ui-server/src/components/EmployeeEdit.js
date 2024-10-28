import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EMPLOYEE_BY_ID, GET_ALL_EMPLOYEES } from '../graphql/queries';
import { UPDATE_EMPLOYEE } from '../graphql/mutations';
import { Button, Form } from 'react-bootstrap';

const EmployeeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Query to fetch the employee data by ID
  const { loading: loadingEmployee, error: errorEmployee, data: dataEmployee } = useQuery(GET_EMPLOYEE_BY_ID, {
    variables: { id }
  });

  // Query to fetch all employees (if needed for validation or other purposes)
  const { loading: loadingEmployees, error: errorEmployees, data: dataEmployees } = useQuery(GET_ALL_EMPLOYEES);

  // Mutation to update the employee details
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);

  // State to store the employee data
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    age: '',
    dateOfJoining: '',
    title: '',
    department: '',
    employeeType: '',
    currentStatus: false,
  });

  // Effect to set the employee data when the query returns the data
  useEffect(() => {
    if (dataEmployee) {
      setEmployee({
        firstName: dataEmployee.getEmployeeById.firstName,
        lastName: dataEmployee.getEmployeeById.lastName,
        age: dataEmployee.getEmployeeById.age,
        dateOfJoining: dataEmployee.getEmployeeById.dateOfJoining.substring(0, 10), // Ensure proper date format for input
        title: dataEmployee.getEmployeeById.title,
        department: dataEmployee.getEmployeeById.department,
        employeeType: dataEmployee.getEmployeeById.employeeType,
        currentStatus: dataEmployee.getEmployeeById.currentStatus,
      });
    }
  }, [dataEmployee]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmployee({
      ...employee,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee({
        variables: {
          id,
          firstName: employee.firstName,
          lastName: employee.lastName,
          age: parseInt(employee.age),
          dateOfJoining: employee.dateOfJoining,
          title: employee.title,
          department: employee.department,
          employeeType: employee.employeeType,
          currentStatus: employee.currentStatus
        }
      });
      navigate('/employee-directory'); // Redirect to the employee directory after update
    } catch (err) {
      console.error("Error updating employee:", err.message);
    }
  };

  // Loading and error handling
  if (loadingEmployee || loadingEmployees) return <p>Loading...</p>;
  if (errorEmployee) return <p>Error fetching employee: {errorEmployee.message}</p>;
  if (errorEmployees) return <p>Error fetching employees: {errorEmployees.message}</p>;

  return (
    <div>
      <h2>Edit Employee</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={employee.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={employee.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={employee.age}
            onChange={handleChange}
            min="20"
            max="70"
            required
          />
        </Form.Group>
        <Form.Group controlId="formDateOfJoining">
          <Form.Label>Date of Joining</Form.Label>
          <Form.Control
            type="date"
            name="dateOfJoining"
            value={employee.dateOfJoining}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={employee.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDepartment">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            name="department"
            value={employee.department}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmployeeType">
          <Form.Label>Employee Type</Form.Label>
          <Form.Control
            type="text"
            name="employeeType"
            value={employee.employeeType}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formCurrentStatus">
          <Form.Check
            type="checkbox"
            label="Active"
            name="currentStatus"
            checked={employee.currentStatus}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Employee
        </Button>
      </Form>
    </div>
  );
};

export default EmployeeEdit;
