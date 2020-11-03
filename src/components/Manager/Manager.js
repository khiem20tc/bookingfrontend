import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

import './Manager.css';

function Manager() {

  const[userID,setuserID] = useState('');
  const[history,setHistory_] = useState('');
  const[address, setAddress] = useState('');

  if (localStorage.getItem('token'))
  var token = "HKNee " + localStorage.getItem('token').substring(1,localStorage.getItem('token').length-1);

  const getOrderList = async event => {
    event.preventDefault();

    var list = document.getElementById("listOrder");

    await axios.get(`http://localhost:5000/order/`)
    .then(res => {
      console.log(res);
      console.log(res.data);
      list.innerHTML = JSON.stringify(res.data);
    })
    .catch(err => {
      console.log(err)
    })
  }

  const getUserList = async event => {
    event.preventDefault();

    var list = document.getElementById("listUser");

    await axios.get(`http://localhost:5000/user/`)
    .then(res => {
      console.log(res);
      console.log(res.data);
      list.innerHTML = JSON.stringify(res.data);
    })
    .catch(err => {
      console.log(err)
    })
  }

  const deleteUser = async event => {
    event.preventDefault();

    await axios.delete(`http://localhost:5000/user/${userID}`, {
      headers: {
        'Authorization': `${token}`
      }
    })
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch(err => {
      console.log(err)
    })
  }

  const history_ = {
    history: history
  }

  const setHistory = async event => {
    event.preventDefault();

    await axios.put(`http://localhost:5000/user/setHistory/${address}`, history_, {
      headers: {
        'Authorization': `${token}`
      }
    })
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div>
    <p>This is manager page</p>
    <form onSubmit={getOrderList}>
      <button type="submit">GetOrderList</button>
    </form>
    <p id="listOrder"></p>
    <form onSubmit={getUserList}>
      <button type="submit">GetUserList</button>
    </form>
    <p id="listUser"></p>
    <div>
          <input placeholder="userID" type="text" onChange={(event) => setuserID(event.target.value)}/>
    </div>
    <form onSubmit={deleteUser}>
      <button type="submit">DeleteUser</button>
    </form>
    <div>
          <input placeholder="Address" type="text" onChange={(event) => setAddress(event.target.value)}/>
    </div>
    <div>
          <input placeholder="setHistory" type="text" onChange={(event) => setHistory_(event.target.value)}/>
    </div>
    <form onSubmit={setHistory}>
      <button type="submit">setHistory</button>
    </form>
    </div>
  );
}

export default withRouter(Manager)
