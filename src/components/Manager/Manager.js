import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

import './Manager.css';

function Manager(props) {
  

  const logout = async event => {
    event.preventDefault();
    localStorage.clear();
    window.location.href = '/';
  }

  const UserList = async event => {
    event.preventDefault();
    props.history.push('/Manager/UserList')
  }

  const OrderList = async event => {
    event.preventDefault();
    props.history.push('/Manager/OrderList')
  }

  return (
    <div>
    <p>Welcome {localStorage.getItem('userName')} to manager page</p>
    <div id="logout">
    <a href="#" onClick={logout}>LOGOUT</a>
    </div>
    <div id="menu">
    <ul>
    <form onSubmit={OrderList}>
      <button type="submit">OrderList</button>
    </form>
    <form onSubmit={UserList}>
      <button type="submit">UserList</button>
    </form>
    </ul>
    </div>
    <br></br>
    
    </div>
  );
}

export default withRouter(Manager)
