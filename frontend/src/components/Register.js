import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Register.scss";
import Validation from './RegisterValidation';
import axios from "axios";

const Register = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
    
  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if(errors.name === "" && errors.email === "" && errors.password === "") {
        axios.post('http://localhost:8081/signup', values)
        .then(res => {
           navigate('/');
        })
        .catch(err => console.log(err));
    }
  }

  return (
    <div className="container">
    <div className="registerForm" action="" onSubmit={handleSubmit}>
      <div className="header">Sign-Up</div>
      <div className="detail">
        <h4>Name</h4>
        <input placeholder="Enter Name" name="name" onChange={handleInput} />
        <div>{errors.name && <span className="red-text">{errors.name}</span>}</div>
      </div>
      <div className="detail">
        <h4>Email</h4>
        <input placeholder="Enter Email" name="email" onChange={handleInput} />
        <div>{errors.email && <span className="red-text">{errors.email}</span>}</div>
      </div>
      <div className="detail">
        <h4>Password</h4>
        <input placeholder="Enter Password" name="password" onChange={handleInput}/>
        <div>{errors.password && <span className="red-text">{errors.password}</span>}</div>
      </div>
      <button type="submit" onClick={handleSubmit} className="signup">Sign up</button>
      <p>You agree to our terms and conditions</p>
      <Link to="/" className="login">
        Login
      </Link>
    </div>
    </div>
  )
}

export default Register