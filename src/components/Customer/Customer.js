import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

import './Customer.css';

function Customer(props) {

  const [report, setReport] = useState('');
  const[order,setOrder] = useState({});

  if (localStorage.getItem('token'))
  var token = "HKNee " + localStorage.getItem('token').substring(1,localStorage.getItem('token').length-1);

  const Booking = async event => {
    event.preventDefault();
    
    const order = {
      "Shipper": "1a1941cb83beb06352357780cd6b2a62f4518ccf680eebc9b934bfbca29c1c6c",
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
      document.getElementById("order_").innerHTML = JSON.stringify(res.data);
      console.log(res.data)
      setOrder(res.data);
    })
    .catch(err => {
      console.log(err)
    })
  }

  const getInfoOrder = async event => {
    event.preventDefault();

    if(localStorage.getItem('ID_order'))
    var ID = localStorage.getItem('ID_order');

    await axios.get(`http://localhost:5000/order/${ID}`)
    .then(res => {
      console.log(res);
      console.log(res.data);
      document.getElementById("order_").innerHTML = JSON.stringify(res.data);
      setOrder(res.data);
    })
    .catch(err => {
      console.log(err)
    })
  }

  const Cancel = async event => {
    event.preventDefault();

    if(localStorage.getItem('ID_order'))
    var ID = localStorage.getItem('ID_order');

    await axios.put(`http://localhost:5000/order/${ID}/cancel`, {}, {
      headers: {
        'Authorization': `${token}`
      }
    })
  .then(res => {
    console.log(res);
    console.log(res.data);
    alert("Đã hủy đơn hàng thành công");
  })
  .catch(err => {
    console.log(err)
  })
  }

  const Report = async event => {
    event.preventDefault();
    
    if(localStorage.getItem('ID_order'))
    var ID = localStorage.getItem('ID_order');

    const report_ = {
      Report: report
    }

    await axios.put(`http://localhost:5000/order/${ID}/report`, report_, {
      headers: {
        'Authorization': `${token}`
      }
    })
  .then(res => {
    console.log(res);
    console.log(res.data);
    alert("Report đã được ghi nhận lên hệ thống");
  })
  .catch(err => {
    console.log(err)
  })
  }

  return (
    <div>
    <p>This is customer page</p>
    <p id="order_"></p>
    <form onSubmit={Booking}>
      <button type="submit">Booking</button>
    </form>
    <form onSubmit={getInfoOrder}>
      <button type="submit">GetInfoOrder</button>
    </form>
    <form onSubmit={Cancel}>
      <button type="submit">Cancel</button>
    </form>
    <div>
          <input placeholder="Report" type="text" onChange={(event) => setReport(event.target.value)}/>
    </div>
    <form onSubmit={Report}>
      <button type="submit">Report</button>
    </form>
    <ul>
        <div>
          <li>ID: {order.ID}</li>
          <li>Customer: {order.Customer}</li>
          <li>Shipper: {order.Shipper}</li>
          <li>Value: {order.Value}</li>
          <li>State: {order.State}</li>
          <li>ReportByCustomer: {order.ReportByCustomer}</li>
          <li>ReportByShipper: {order.ReportByShipper}</li>
          <br></br>
        </div>
    </ul>
    </div>
  );
}

export default withRouter(Customer)