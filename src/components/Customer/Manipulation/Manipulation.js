import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

import './Manipulation.css';

function Manipulation(props) {
    
    const[order,setOrder] = useState();

    if (localStorage.getItem('token'))
    var token = "HKNee " + localStorage.getItem('token').substring(1,localStorage.getItem('token').length-1);

    const Manipulation = async event => {
        event.preventDefault();
        props.history.push('/customer/Manipulation')
      }
    
    const HomeCustomer = async event => {
        event.preventDefault();
        props.history.push('/customer')
      }

    const getInfoOrder = async event => {
        event.preventDefault();
    
        // if(localStorage.getItem('ID_order'))
        // var ID = localStorage.getItem('ID_order');
    
        await axios.get(`http://localhost:5000/order/requestIDbyCustomer`, {
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

    return (
        <div>
        <form onSubmit={HomeCustomer}>
        <button type="submit">HomeCustomer</button>
        </form>
        <form onSubmit={Manipulation}>
        <button type="submit">Manipulation</button>
        </form>    
        <form onSubmit={getInfoOrder}>
        <button type="submit">GetInfoOrder</button>
        </form>
        <ul>
    {order &&
    order.map((item, index) => {
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
        </div>
    );
}

export default withRouter(Manipulation);