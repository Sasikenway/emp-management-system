const Employee = require('../models/employee');

const resolvers = {
  Query: {
    // Get all employees with optional search and filter
    employees: async (_, { search, department }) => {
      try {
        // Create filter based on search term and department
        const filter = {};
        if (search) {
          filter.$or = [
            { firstName: new RegExp(search, 'i') },
            { lastName: new RegExp(search, 'i') }
          ];
        }
        if (department) {
          filter.department = department;
        }
        return await Employee.find(filter);
      } catch (err) {
        throw new Error('Error fetching employees: ' + err.message);
      }
    },

    // Get employee by ID
    getEmployeeById: async (_, { id }) => {
      try {
        const employee = await Employee.findById(id);
        if (!employee) {
          throw new Error('Employee not found');
        }
        return employee;
      } catch (err) {
        throw new Error('Error fetching employee: ' + err.message);
      }
    },
  },

  Mutation: {
    // Create a new employee
    createEmployee: async (_, { firstName, lastName, age, dateOfJoining, title, department, employeeType, currentStatus }) => {
      try {
        const newEmployee = new Employee({
          firstName,
          lastName,
          age,
          dateOfJoining,
          title,
          department,
          employeeType,
          currentStatus
        });
        return await newEmployee.save();
      } catch (err) {
        throw new Error('Error creating employee: ' + err.message);
      }
    },

    // Update an existing employee
    updateEmployee: async (_, { id, title, department, employeeType, currentStatus, dateOfJoining }) => {
      try {
        const updateData = { title, department, employeeType, currentStatus, dateOfJoining };

        // Remove fields that are undefined or null
        Object.keys(updateData).forEach(key => updateData[key] === undefined || updateData[key] === null ? delete updateData[key] : null);

        const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedEmployee) {
          throw new Error('Employee not found');
        }
        return updatedEmployee;
      } catch (err) {
        throw new Error('Error updating employee: ' + err.message);
      }
    },
    
    // Delete an employee by ID
    deleteEmployee: async (_, { id }) => {
      try {
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) {
          throw new Error('Employee not found');
        }
        return deletedEmployee;
      } catch (err) {
        throw new Error('Error deleting employee: ' + err.message);
      }
    },
  },
};


module.exports = resolvers;
