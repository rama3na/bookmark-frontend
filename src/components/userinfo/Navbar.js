import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginContext } from '../../contexts/loginContext';

function Navbar() {
  let { userLoginStatus, logoutUser } = useContext(loginContext);
  let navigate = useNavigate();

  const activeLink = {
    color: "#ffaa00",
    fontSize: "1.2rem",
    fontWeight: 'bold'
  };

  const inactiveLink = {
    color: "#EEF02",
    fontSize: "1.2rem"
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <nav className='navbar navbar-expand-sm bg-black'>
      <div className="container-fluid">
        <button className="glow-on-hover text-bold" type="button" onClick={goHome}>📚 BookMark Manager</button>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {userLoginStatus ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link text-white glow-on-hover" to="/" style={({ isActive }) => isActive ? activeLink : inactiveLink}>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white glow-on-hover" to="/adduser" style={({ isActive }) => isActive ? activeLink : inactiveLink}>
                    Add Book
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white glow-on-hover" to="/userlist" style={({ isActive }) => isActive ? activeLink : inactiveLink}>
                    View Books
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white glow-on-hover" to="/" style={({ isActive }) => isActive ? activeLink : inactiveLink} onClick={logoutUser}>
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link text-white glow-on-hover" to="/login" style={({ isActive }) => isActive ? activeLink : inactiveLink}>
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white glow-on-hover" to="/register" style={({ isActive }) => isActive ? activeLink : inactiveLink}>
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
