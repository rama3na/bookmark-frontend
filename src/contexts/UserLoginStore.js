import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { loginContext } from './loginContext';

function UserLoginStore({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [loginErr, setLoginErr] = useState("");
  const [userLoginStatus, setUserLoginStatus] = useState(false);

   
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
       
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth-api/verify-token`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        setUserLoginStatus(true);
        setCurrentUser(JSON.parse(userData));
      })
      .catch(() => {
        logoutUser();  
      });
    }
  }, []);

   
  const loginUser = (userCredObj) => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth-api/login`, userCredObj)
      .then((response) => {
        if (response.data.message === 'Success') {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));

          setCurrentUser(response.data.user);
          setLoginErr("");
          setUserLoginStatus(true);
        } else {
          setLoginErr(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response) {
          setLoginErr(err.response.data.message);
        } else if (err.request) {
          setLoginErr("No response from server. Please try again later.");
        } else {
          setLoginErr("Something went wrong. Please check your network.");
        }
      });
  };

   
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUserLoginStatus(false);
    setCurrentUser({});
  };

  return (
    <loginContext.Provider value={{ currentUser, loginErr, userLoginStatus, loginUser, logoutUser }}>
      {children}
    </loginContext.Provider>
  );
}

export default UserLoginStore;
