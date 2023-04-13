import React, { useState } from 'react';
import "./Login.scss";
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';

const Login = () => {
  const [values, setValues] = useState({
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
    if(errors.email === "" && errors.password === "") {
      axios.post('http://localhost:8081/login', values)
      .then(res => {
        if(res.data === "Success") {
          navigate('/home');
        } else {
          alert("No record exists!");
        }
      })
      .catch(err => console.log(err));
    }
  }

  return (
    <div className="container">
    <div className="loginForm" action="" onSubmit={handleSubmit}>
      <div className="detail">
        <h4>Email</h4>
        <input placeholder="Enter Email" name="email" onChange={handleInput} />
        <div>{errors.email && <span className="text-red">{errors.email}</span>}</div>
      </div>
      <div className="detail">
        <h4>Password</h4>
        <input placeholder="Enter Password" name="password" onChange={handleInput}/>
        <div>{errors.password && <span className="text-red">{errors.password}</span>}</div>
      </div>
      <button type="submit" onClick={handleSubmit} className="sign-in">Login</button>
      <p>You agree to our terms and conditions</p>
      <Link to="/signup" className="register">
        Create Account
      </Link>
    </div>
    </div>
  )
}

export default Login