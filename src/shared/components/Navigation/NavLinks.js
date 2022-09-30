import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/authContext';
import './NavLinks.css';

const NavLinks = props => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink end to="/" >ALL USERS</NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/todolists`}>MY TO-DO LISTS</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/todolist/new">ADD TO-DO LIST</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={() => {
            auth.logout();
            navigate('/auth');
          }}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
