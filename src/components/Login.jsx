import React from 'react';
import './Login.css';
import Logo from '../assets/Group.png'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className='login-container'>
      <form className='login-form'>
        <div className='logo-container'>
            <img src={Logo} className='logo'/>
            <p>logo</p>
        </div>
        <div className='greeting-container'>
            <h1>Welcome!</h1>
            <h2>Hello, welcome back </h2>
            <p>Enter the information you entered during registration, this helps us remember you.</p>
        </div>
        <div className='input-area'>
            <label>Email Adress</label>
            <input type='email' className=''/>
        </div>
        <div style={{marginTop:'10px'}} className='input-area'>
            <label>Password</label>
            <input className='' type='password'/>
        </div>
        <div className='btn-container'>
        <button onClick={()=>{
          navigate('/dashboard')
        }} className='login-btn'>
            login
        </button>
        </div>

      </form>
    </div>
  )
}

export default Login
