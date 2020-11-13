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

  const logout = async event => {
    event.preventDefault();
    localStorage.clear();
    window.location.href = '/';
  }

    return(
        <div>
          <p>Welcome {localStorage.getItem('userName')} to manager page</p>
          <div>
    <a href="#" onClick={logout}>LOGOUT</a>
    </div>
            <form onSubmit={getUserList}>
      <button type="submit">GetUserList</button>
    </form>

    <table id="orders">
    <tr>
    <th>UserName</th>
    <th>Role</th>
    <th>Address</th>
    <th>History</th>
    <th>Delete</th>
    <th>SetHistory</th>
    </tr>
        {/* <ul> */}
    {user &&
    user.map((item, index) => {
      return(
        // <div>
          <tr>
          <td key={index}>{item.userName}</td>
          <td key={index}>{item.role}</td>
          <td key={index}>{item.address}</td>
          <td key={index}>{item.history}</td>
          <td key={index}>
          <form onSubmit={event => {deleteUser(event, item._id)}}>
          <button type="submit">DeleteUser</button>
          </form>
          </td>
          <td key={index}>
          <div>
          <input placeholder="setHistory" type="text" onChange={(event) => setHistory_(event.target.value)}/>
          </div>
          <form onSubmit={event => {setHistory(event, item.address)}}>
          <button type="submit">SetHistory</button>
          </form>
          </td>
          <br></br>
          </tr>
        // </div>
      )
    })}
        {/* </ul> */}
        </table>

    {/* <ul>
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
    </ul> */}

   
        </div>
    );
}

export default withRouter(UserList)