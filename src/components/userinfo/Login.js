import React, { useContext, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { loginContext } from '../../contexts/loginContext';
import { useForm } from 'react-hook-form';
import "../allcss/Login.css"; // Import custom CSS

function Login() {
  let { loginUser, userLoginStatus, loginErr } = useContext(loginContext);
  const navigate = useNavigate();
  let { register, handleSubmit, formState: { errors } } = useForm();

  let handleUserLogin = (userCreds) => {
    loginUser(userCreds);
  };

  useEffect(() => {
    if (userLoginStatus) {
      navigate("/");
    }
  }, [userLoginStatus, navigate]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h3 className="login-title">Welcome Back</h3>
        {loginErr && <p className="error-text">{loginErr}</p>}

        <form onSubmit={handleSubmit(handleUserLogin)}>
          <label>Email</label>
          <input 
            type="email" 
            className="form-control input-field" 
            {...register("email", { required: "Email is required" })} 
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}

          <label>Password</label>
          <input 
            type="password" 
            className="form-control input-field" 
            {...register("password", { required: "Password is required" })} 
          />
          {errors.password && <p className="error-text">{errors.password.message}</p>}

          <button type="submit" className="login-btn">Login</button>
        </form>

        <p className="register-link">Don't have an account? <span onClick={() => navigate('/register')}>Register</span></p>
      </div>
    </div>
  );
}

export default Login;
