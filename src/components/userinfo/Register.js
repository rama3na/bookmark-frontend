import React, { useState } from 'react'; 
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../allcss/Register.css'; // Import custom CSS

function Register() {
  let { register, handleSubmit, formState: { errors } } = useForm();
  let navigate = useNavigate();
  let [err, setError] = useState("");
  let [loading, setLoading] = useState(false);

  let addNewUser = async (newUser) => {
    setLoading(true);
    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth-api/register`, newUser)
      .then(response => {
        if (response.status === 200 && response.data.message === "User registered successfully") {
          navigate('/login');
        } else {
          setError(response.data.message || "Registration failed");
        }
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Something went wrong. Please try again.");
      })
      .finally(() => setLoading(false)); // Stop loading
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h3 className="register-title">Create an Account</h3>
        {err && <p className="error-text">{err}</p>}

        <form onSubmit={handleSubmit(addNewUser)}>
          <label>Email</label>
          <input 
            type="email" 
            className="form-control input-field" 
            {...register("email", { required: 'Email is required' })} 
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}

          <label>Password</label>
          <input 
            type="password" 
            className="form-control input-field" 
            {...register("password", { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })} 
          />
          {errors.password && <p className="error-text">{errors.password.message}</p>}

          <button className="register-btn" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="login-link">Already have an account? <span onClick={() => navigate('/login')}>Login</span></p>
      </div>
    </div>
  );
}

export default Register;
