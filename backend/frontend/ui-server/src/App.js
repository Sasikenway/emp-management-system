import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import EmployeeDirectory from './components/EmployeeDirectory';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeSearch from './components/EmployeeSearch';
import LandingPage from './components/LandingPage';
import EmployeeDetails from './components/EmployeeDetails';
import EmployeeEdit from './components/EmployeeEdit';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <Router>
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/employee-directory" element={<EmployeeDirectory />} />
        <Route path="/employee-directory/:employeeType" element={<EmployeeDirectory />} />
        <Route path="/employee-edit/:id" element={<EmployeeEdit />} />
        <Route path="/employee-create" element={<EmployeeCreate />} />
        <Route path="/employee-search" element={<EmployeeSearch />} />
        <Route path="/employee-details/:id" element={<EmployeeDetails />} />
      </Routes>
    </div>
  </Router>
);

export default App;
