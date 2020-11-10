import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

import './OrderList.css';

function OrderList(props) {

    const[order,setOrder] = useState();
    if (localStorage.getItem('token'))
    var token = "HKNee " + localStorage.getItem('token').substring(1,localStorage.getItem('token').length-1);

    const getOrderList = async event => {
        event.preventDefault();
    
        await axios.get(`http://localhost:5000/order/`)
        .then(res => {
          console.log(res);
          console.log(res.data); 
          setOrder(res.data);
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
            <form onSubmit={getOrderList}>
      <button type="submit">GetOrderList</button>
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
    <div>
    <a href="#" onClick={logout}>LOGOUT</a>
    </div>
    
        </div>
    );
}

export default withRouter(OrderList)