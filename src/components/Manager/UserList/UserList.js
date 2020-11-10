import React, { useState, useRef } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

import './UserList.css';

function UserList(props) {

    const[user,setUser] = useState();
    const userID_ = useRef('');
    const address_ = useRef('');
    const history_ = useRef('');

  var address = address_.current.value;
  var userID = userID_.current.value;
  var history = history_.current.value;

  if (localStorage.getItem('token'))
  var token = "HKNee " + localStorage.getItem('token').substring(1,localStorage.getItem('token').length-1);

  const getUserList = async event => {
    event.preventDefault();
    
    await axios.get(`http://localhost:5000/user/`)
    .then(res => {
      console.log(res);
      console.log(res.data);
      setUser(res.data);
      console.log(user);
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

  const history__ = {
    history: history
  }

  const setHistory = async event => {
    event.preventDefault();

    await axios.put(`http://localhost:5000/user/setHistory/${address}`, history__, {
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

    return(
        <div>
            <form onSubmit={getUserList}>
      <button type="submit">GetUserList</button>
    </form>
    <div>
          <input placeholder="userID" ref={userID_} type="text"/>
    </div>
    <form onSubmit={deleteUser}>
      <button type="submit">DeleteUser</button>
    </form>
    <div>
          <input placeholder="Address" ref={address_} type="text"/>
    </div>
    <div>
          <input placeholder="setHistory" ref={history_} type="text"/>
    </div>
    <form onSubmit={setHistory}>
      <button type="submit">setHistory</button>
    </form>
    <ul>
    {user &&
    user.map( (item, index) => {
      return(
        <div>
          <li key={index}>userName: {item.userName}</li>
          <li key={index}>Role: {item.role}</li>
          <li key={index}>Address: {item.address}</li>
          <li key={index}>History: {item.history}</li>
          <br></br>
        </div>
      )
    })}
    </ul>
        </div>
    );
}

export default withRouter(UserList)