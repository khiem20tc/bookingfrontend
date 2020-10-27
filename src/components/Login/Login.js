import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Login.css';

export default function Login() {

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Login</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text"/>
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text"/>
        </div>
        <Link>
          <button className={'button mt-20'} type="submit">Login</button>
        </Link>
        <h2 className="footing">HuuKhiemNee 2020</h2>
      </div>
    </div>
  );
}
