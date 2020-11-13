import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

import './OrderProcessed.css';

function OrderProcessed(props) {

    const[order,setOrder] = useState();

    if (localStorage.getItem('token'))
    var token = "HKNee " + localStorage.getItem('token').substring(1,localStorage.getItem('token').length-1);

    const getInfoOrder = async event => {
        event.preventDefault();
    
        await axios.get(`http://localhost:5000/order/orderListByUser`, {
          headers: {
            'Authorization': `${token}`
          }
        })
        .then(res => {
          console.log(res);
          console.log(res.data);
          setOrder(res.data);
        })
        .catch(err => {
          console.log(err)
        })
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

      const logout = async event => {
        event.preventDefault();
        localStorage.clear();
        window.location.href = '/';
      }

    return(
        <div>
            <p>Welcome {localStorage.getItem('userName')} to customer page</p>
            <div>
    <a href="#" onClick={logout}>LOGOUT</a>
    </div>
            <div id="menu">
    <ul>
        <form onSubmit={HomeCustomer}>
        <a>
      <button type="submit">HomeCustomer</button></a>
    </form>
    <form onSubmit={OrderProcessing}>
      <a>
      <button type="submit">OrderProcessing</button></a>
    </form>
    <form onSubmit={OrderProcessed}>
    <a>
      <button type="submit">OrderProcessed</button></a>
    </form>   
    </ul>
    </div>
        <br></br>

        <form onSubmit={getInfoOrder}>
        <button type="submit">GetInfoOrder</button>
        </form>

        <br></br>
        <table id="orders">
    <tr>
    <th>ID</th>
    <th>Customer</th>
    <th>Shipper</th>
    <th>Value</th>
    <th>State</th>
    <th>ReportByCustomer</th>
    <th>ReportByShipper</th>
    </tr>
        {/* <ul> */}
    {order &&
    order.map((item, index) => {
      return(
        // <div>
          <tr>
          <td key={index}>{item.ID}</td>
          <td key={index}>{item.Customer}</td>
          <td key={index}>{item.Shipper}</td>
          <td key={index}>{item.Value}</td>
          <td key={index}>{item.State}</td>
          <td key={index}>{item.ReportByCustsomer}</td>
          <td key={index}>{item.ReportByShipper}</td>
          <br></br>
          </tr>
        // </div>
      )
    })}
        {/* </ul> */}
        </table>
        </div>
    );
}

export default withRouter(OrderProcessed)