import React, { useState } from 'react';
import "../styles/Login.scss";
import { API_URL } from '../config';
import { setLogin } from '../redux/state';
import {useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
      })

      const loggedIn = await response.json();

      if(loggedIn){
        // console.log(loggedIn);
        dispatch(setLogin({
          user: loggedIn.user,
          token: loggedIn.token
        }))
        navigate("/")
      }

    } catch (err) {
      console.log("Log in failed ", err.message);

    }
  }
  return (
    <div className='login'>
      <div className="login_content">
        <form action="" className='login_content_form' onSubmit={handleSubmit}>
         <input type="email" placeholder='Email' name="" value={email} onChange={(e)=>setEmail(e.target.value)}  id="email" required/>
         <input type="password" placeholder="password" name="" value={password} onChange={(e)=>setPassword(e.target.value)} id="password" required/>
         <button type="submit">Login</button>
        </form>
        <a href="/register">Don't have an account? Register here</a>
      </div>
    </div>
  )
}

export default LoginPage
