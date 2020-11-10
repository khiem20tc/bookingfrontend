import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

import './Login.css';

function Login(props) {

  const [userName, setuserName] = useState('');
  const [password, setpassword] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
  
    const user = {
    userName: userName,
    password: password
    };

    var token; 
    await axios.post(`http://localhost:5000/user/login`, user )
      .then(res => {
        console.log(res);
        console.log(res.data);
        localStorage.setItem('token', JSON.stringify(res.data.token))
        localStorage.setItem('userName', user.userName)
        token = "HKNee " + res.data.token;
      })
      .catch(err => {
        console.log(err)
      })
    
    // if (localStorage.getItem('token'))
    // var token = "HKNee " + localStorage.getItem('token').substring(1,localStorage.getItem('token').length-1);
    // else (alert("Sai ten dang nhap hoac mat khau"))

    await axios.post('http://localhost:5000/user/checkrole', {}, {
      headers: {
        'Authorization': `${token}`
      }
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
        if (res.data.role == "customer") props.history.push('/customer');
        else if (res.data.role == "shipper") props.history.push('/shipper');
        else if (res.data.role == "manager") props.history.push('/manager');
      })
      .catch(err => {
        console.log(err) 
      })

      if(!token) alert("Sai tên đăng nhập hoặc mật khẩu");
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
        <Link to="/signup">
        <button className={'button mt-20'} type="submit">Sign Up</button>
        </Link>
        <h2 className="footing">HuuKhiemNee 2020</h2>
      </div>
    </div>
  );
}
export default withRouter(Login)