import React, { useState, useRef } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

import './Signup.css';

function Signup(props) {
    const [userName, setuserName] = useState('');
    const [password, setpassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();

        const user = {
            userName: userName,
            password: password,
            role: role
        };

        var isSucessful = false;
        await axios.post(`http://localhost:5000/user/signup`, user )
            .then(res => {
                console.log(res);
                console.log(res.data);
                console.log(res.status);
                if(res.status == 200) isSucessful = true;
            })
            .catch(err => {
                console.log(err)
            })

          if(isSucessful){ 
            alert("Đăng ký thành công");
            props.history.push('/');}
          else alert("Tên đăng ký đã tồn tại");
    }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">SignUp</h1>
        <form onSubmit={handleSubmit}>
        <div>
          <input placeholder="userName" className="joinInput" type="text" onChange={(event) => setuserName(event.target.value)}/>
        </div>
        <div>
          <input placeholder="Password" className="joinInput mt-20" type="password" onChange={(event) => setpassword(event.target.value)}/>
        </div>
        <div className="role">
        <label>Roles:</label>
        <div onChange={(event) => setRole(event.target.value)}>
        <input type="radio" value="customer" name="role"/>
        <label  className="joinInput mt-20">Customer</label>
        <input type="radio" value="shipper" name="role"/>
        <label className="joinInput mt-20">Shipper</label>
        <input type="radio" value="manager" name="role"/>
        <label className="joinInput mt-20">Manager</label>
        </div>
        </div>
        <button className={'button mt-20'} type="submit">Sign Up</button>
        </form>
        <h2 className="footing">HuuKhiemNee 2020</h2>
      </div>
    </div>
  );
}

export default withRouter(Signup)