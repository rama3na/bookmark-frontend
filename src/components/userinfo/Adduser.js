import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../allcss/AddUser.css';

function AddUser() {
  let { register, handleSubmit, formState: { errors } } = useForm();
  let navigate = useNavigate();
 
  const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3500";

  let newUser = async (userdata) => {
      try {
          const response = await axios.post(`${BASE_URL}/user-api/adduser`, userdata, {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          });
          console.log("Response:", response.data);
          navigate('/userlist');
      } catch (error) {
          console.error("Error in Add Bookmark page:", error.response?.data || error.message);
      }
  };
  

  return (
    <div className="adduser-container">
      <div className="adduser-card">
        <h3 className="text-center adduser-title">Add New Bookmark</h3>
        <p className="text-center adduser-description">
          Save and manage your favorite links easily.
        </p>
        <form onSubmit={handleSubmit(newUser)} className="adduser-form">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" id="title"
            {...register("title", { required: "Title is required" })} />
          {errors.title && <p className="text-danger">{errors.title.message}</p>}

          <label htmlFor="content">URL</label>
          <input type="url" className="form-control" id="content"
            {...register("content", { required: "URL is required", pattern: { value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, message: "Enter a valid URL" } })} />
          {errors.content && <p className="text-danger">{errors.content.message}</p>}

          <button className="btn btn-primary w-100 mt-3" type="submit">Save Bookmark</button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
