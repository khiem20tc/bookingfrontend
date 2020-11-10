import React, { useState, useRef } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

import './UserList.css';

function UserList(props) {

    const[user,setUser] = useState();
    const[history,setHistory_] = useState();

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

  const deleteUser = async (event,ID) => {
    event.preventDefault();

    await axios.delete(`http://localhost:5000/user/${ID}`, {
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

  const setHistory = async (event,address) => {
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

  const logout = async event => {
    event.preventDefault();
    localStorage.clear();
    window.location.href = '/';
  }

    return(
        <div>
          <p>Welcome {localStorage.getItem('userName')} to manager page</p>
            <form onSubmit={getUserList}>
      <button type="submit">GetUserList</button>
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
          <li key={index}>DeleteUser:
          <form onSubmit={event => {deleteUser(event, item._id)}}>
          <button type="submit">DeleteUser</button>
          </form>
          </li>
          <li key={index}>SetHistory:
          <div>
          <input placeholder="setHistory" type="text" onChange={(event) => setHistory_(event.target.value)}/>
          </div>
          <form onSubmit={event => {setHistory(event, item.address)}}>
          <button type="submit">SetHistory</button>
          </form>
          </li>
          <br></br>
        </div>
      )
    })}
    </ul>
    <div>
    <a href="#" onClick={logout}>LOGOUT</a>
    </div>
        </div>
    );
}

export default withRouter(UserList)