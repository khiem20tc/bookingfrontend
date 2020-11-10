import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

import './Customer.css';

function Customer(props) {

  const [report, setReport] = useState('');
  
  const[order_,setOrder_] = useState({});

  if (localStorage.getItem('token'))
  var token = "HKNee " + localStorage.getItem('token').substring(1,localStorage.getItem('token').length-1);

  const Booking = async event => {
    event.preventDefault();
    
    const order = {
      "Value": "500"
    }

  var ID;
  await axios.post(`http://localhost:5000/order/create`, order, {
    headers: {
      'Authorization': `${token}`
    }
  } )
  .then(res => {
    console.log(res);
    console.log(res.data);
    console.log(res.data.ID);
    localStorage.setItem('ID_order', JSON.stringify(res.data.ID))
    ID = res.data.ID;
    alert("Tạo đơn hàng thành công");
  })
  .catch(err => {
    console.log(err)
  })

  await axios.get(`http://localhost:5000/order/${ID}`)
    .then(res => {
      console.log(res);
      console.log(res.data);
      console.log(res.data)
      setOrder_(res.data);
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

  const OrderProcessing = async event => {
    event.preventDefault();
    props.history.push('/customer/OrderProcessing')
  }

  const OrderProcessed = async event => {
    event.preventDefault();
    props.history.push('/customer/OrderProcessed')
  }

  const HomeCustomer = async event => {
    event.preventDefault();
    props.history.push('/customer')
  }

  return (
    <div>
    <p>Welcome {localStorage.getItem('userName')} to customer page</p>
    <form onSubmit={HomeCustomer}>
      <button type="submit">HomeCustomer</button>
    </form>
    <form onSubmit={OrderProcessing}>
      <button type="submit">OrderProcessing</button>
    </form>
    <form onSubmit={OrderProcessed}>
      <button type="submit">OrderProcessed</button>
    </form>
    <br></br>
    <p id="order_"></p>
    <form onSubmit={Booking}>
      <button type="submit">Booking</button>
    </form>
    <ul>
        <div>
          <li>ID: {order_.ID}</li>
          <li>Customer: {order_.Customer}</li>
          <li>Shipper: {order_.Shipper}</li>
          <li>Value: {order_.Value}</li>
          <li>State: {order_.State}</li>
          <li>ReportByCustomer: {order_.ReportByCustomer}</li>
          <li>ReportByShipper: {order_.ReportByShipper}</li>
          <br></br>
        </div>
    </ul>
    <div>
    <a href="#" onClick={logout}>LOGOUT</a>
    </div>
    </div>
  );
}

export default withRouter(Customer)