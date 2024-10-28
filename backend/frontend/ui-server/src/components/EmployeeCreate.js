import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_EMPLOYEE } from '../graphql/mutations';
import './EmployeeCreate.css';

const EmployeeCreate = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [employeeType, setEmployeeType] = useState('');

  const [createEmployee] = useMutation(CREATE_EMPLOYEE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEmployee({
      variables: {
        firstName,
        lastName,
        age: parseInt(age),
        dateOfJoining,
        title,
        department,
        employeeType
      }
    });
  };

  return (
    <div className="form-container">
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} min="20" max="70" required />
        </div>
        <div className="form-group">
          <label>Date of Joining</label>
          <input type="date" value={dateOfJoining} onChange={(e) => setDateOfJoining(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Title</label>
          <select value={title} onChange={(e) => setTitle(e.target.value)} required>
            <option value="">Select Title</option>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="VP">VP</option>
          </select>
        </div>
        <div className="form-group">
          <label>Department</label>
          <select value={department} onChange={(e) => setDepartment(e.target.value)} required>
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
          </select>
        </div>
        <div className="form-group">
          <label>Employee Type</label>
          <select value={employeeType} onChange={(e) => setEmployeeType(e.target.value)} required>
            <option value="">Select Employee Type</option>
            <option value="FullTime">Full Time</option>
            <option value="PartTime">Part Time</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
          </select>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default EmployeeCreate;
