import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import './Login.css';

export default function Login() {
  const [userName, setuserName] = useState('');
  const [password, setpassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
  
    const user = {
    userName: userName,
    password: password
    };
    
    console.log(user);

    axios.post(`http://localhost:5000/user/login`, user )
      .then(res => {
        console.log(res);
        console.log(res.data);
        localStorage.setItem('token', JSON.stringify(res.data))
      })
      .catch(err => {
        console.log(err)
      })
}

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Login</h1>
        <form onSubmit={handleSubmit}>
        <div>
          <input placeholder="userName" className="joinInput" type="text" onChange={(event) => setuserName(event.target.value)}/>
        </div>
        <div>
          <input placeholder="Password" className="joinInput mt-20" type="password" onChange={(event) => setpassword(event.target.value)}/>
        </div>
        
          <button className={'button mt-20'} type="submit">Login</button>
        
        </form>
        <h2 className="footing">HuuKhiemNee 2020</h2>
      </div>
    </div>
  );
}
