import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EMPLOYEE_BY_ID } from '../graphql/queries';
import { DELETE_EMPLOYEE } from '../graphql/mutations';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_EMPLOYEE_BY_ID, {
    variables: { id }
  });

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);

  const handleDelete = async () => {
    try {
      await deleteEmployee({ variables: { id } });
      navigate('/employee-directory'); // Redirect to employee directory after deletion
    } catch (err) {
      console.error("Error deleting employee:", err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const employee = data?.getEmployeeById;

  if (!employee) {
    return <p>No employee found.</p>;
  }

  const retirementAge = 65;
  const joiningDate = new Date(employee.dateOfJoining);

  // Check if the date is valid
  if (isNaN(joiningDate.getTime())) {
    return <p>Invalid date of joining.</p>;
  }

  const retirementDate = new Date(joiningDate);
  retirementDate.setFullYear(retirementDate.getFullYear() + retirementAge);

  const calculateTimeUntilRetirement = () => {
    const today = new Date();
    let years = retirementDate.getFullYear() - today.getFullYear();
    let months = retirementDate.getMonth() - today.getMonth();
    let days = retirementDate.getDate() - today.getDate();

    // Adjust for negative months or days
    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  };

  const { years, months, days } = calculateTimeUntilRetirement();

  return (
    <div>
      <h2>Employee Details</h2>
      <p><strong>First Name:</strong> {employee.firstName}</p>
      <p><strong>Last Name:</strong> {employee.lastName}</p>
      <p><strong>Age:</strong> {employee.age}</p>
      <p><strong>Date of Joining:</strong> {joiningDate.toLocaleDateString()}</p>
      <p><strong>Title:</strong> {employee.title}</p>
      <p><strong>Department:</strong> {employee.department}</p>
      <p><strong>Employee Type:</strong> {employee.employeeType}</p>
      <p><strong>Status:</strong> {employee.currentStatus ? 'Active' : 'Inactive'}</p>
      <p><strong>Years until Retirement:</strong> {years}</p>
      <p><strong>Months until Retirement:</strong> {months}</p>
      <p><strong>Days until Retirement:</strong> {days}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default EmployeeDetails;
