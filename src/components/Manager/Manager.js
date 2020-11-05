import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

import './Manager.css';

function Manager() {
  const[userID,setuserID] = useState('');
  const[history_,setHistory_] = useState('');
  //const[address, setAddress] = useState('');
  const[user,setUser] = useState();
  const[order,setOrder] = useState();
  const address_ = useRef('');

  //console.log(address_.current)
  var address = address_.current.value;

  if (localStorage.getItem('token'))
  var token = "HKNee " + localStorage.getItem('token').substring(1,localStorage.getItem('token').length-1);

  //var order, user;

  const getOrderList = async event => {
    event.preventDefault();

    //var list = document.getElementById("listOrder");

    await axios.get(`http://localhost:5000/order/`)
    .then(res => {
      console.log(res);
      console.log(res.data);
      //list.innerHTML = JSON.stringify(res.data);   
      setOrder(res.data);
    })
    .catch(err => {
      console.log(err)
    })
  }

  const getUserList = async event => {
    event.preventDefault();

    //var list = document.getElementById("listUser");
    
    await axios.get(`http://localhost:5000/user/`)
    .then(res => {
      console.log(res);
      console.log(res.data);
      //list.innerHTML = JSON.stringify(res.data);
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
    history: history_
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

  return (
    <div>
    <p>This is manager page</p>
    <form onSubmit={getOrderList}>
      <button type="submit">GetOrderList</button>
    </form>
    {/* <p id="listOrder"></p> */}
    <form onSubmit={getUserList}>
      <button type="submit">GetUserList</button>
    </form>
    {/* <p id="listUser"></p> */}
    <div>
          <input placeholder="userID" type="text" onChange={(event) => setuserID(event.target.value)}/>
    </div>
    <form onSubmit={deleteUser}>
      <button type="submit">DeleteUser</button>
    </form>
    <div>
          <input placeholder="Address" ref={address_} type="text"/>
    </div>
    <div>
          <input placeholder="setHistory" type="text" onChange={(event) => setHistory_(event.target.value)}/>
    </div>
    <form onSubmit={setHistory}>
      <button type="submit">setHistory</button>
    </form>
    <ul>
    {order &&
    order.map( (item, index) => {
      return(
        <div>
          <li key={index}>ID: {item.ID}</li>
          <li key={index}>Customer: {item.Customer}</li>
          <li key={index}>Shipper: {item.Shipper}</li>
          <li key={index}>Value: {item.Value}</li>
          <li key={index}>State: {item.State}</li>
          <li key={index}>ReportByCustomer: {item.ReportByCustomer}</li>
          <li key={index}>ReportByShipper: {item.ReportByShipper}</li>
          <br></br>
        </div>
      )
    })}
    </ul>
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

export default withRouter(Manager)
