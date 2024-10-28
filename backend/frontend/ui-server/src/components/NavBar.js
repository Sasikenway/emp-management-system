import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => (
  <nav className="navbar">
    <ul>
      <li>
        <NavLink 
          to="/" 
          className={({ isActive }) => (isActive ? 'active' : '')}
          end
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/employee-directory" 
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Employee Directory
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/employee-create" 
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Add Employee
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/employee-search" 
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Search Employees
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default NavBar;
