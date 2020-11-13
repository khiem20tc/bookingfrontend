import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

import './Shipper.css';

function Shipper(props) {

  const [report, setReport] = useState('');
  //const [ID, setID] = useState('');
  const [state, setState] = useState('');
  const [order_,setOrder_] = useState('');

  if (localStorage.getItem('token'))
  var token = "HKNee " + localStorage.getItem('token').substring(1,localStorage.getItem('token').length-1);

  var ID = '';
  if(localStorage.getItem('ID_order'))
  ID = localStorage.getItem('ID_order');

  const getInfoOrder = async event => {
    event.preventDefault();

    await axios.get(`http://localhost:5000/order/requestIDbyShipper`, {
      headers: {
        'Authorization': `${token}`
      }
    })
    .then(res => {
      console.log(res);
      console.log(res.data);
      localStorage.setItem('ID_order', res.data)
    })
    .catch(err => {
      console.log(err)
    })

    ID = localStorage.getItem('ID_order');

    await axios.get(`http://localhost:5000/order/${ID}`)
    .then(res => {
      console.log(res);
      console.log(res.data);
      setOrder_(res.data);
    })
    .catch(err => {
      console.log(err)
    })
  }

 const SetState = async event => {
   event.preventDefault();

   if(localStorage.getItem('ID_order'))
   var ID = localStorage.getItem('ID_order');

   const State = {
     State: state
   }

   await axios.put(`http://localhost:5000/order/${ID}/setstate`, State, {
    headers: {
      'Authorization': `${token}`
    }
  })
  .then(res => {
    console.log(res);
    console.log(res.data);
    alert("Xác nhận trạng thái thành công");
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

  const logout = async event => {
    event.preventDefault();
    localStorage.clear();
    window.location.href = '/';
  }

  const OrderProcessed = async event => {
    event.preventDefault();
    props.history.push('/shipper/OrderProcessed')
  }

  const HomeShipper = async event => {
    event.preventDefault();
    props.history.push('/shipper')
  }

  return (
    <div>
    <p>Welcome {localStorage.getItem('userName')} to shipper page</p>
    <div>
    <a href="#" onClick={logout}>LOGOUT</a>
    </div>
    <div id="menu">
    <ul>
       <form onSubmit={HomeShipper}>
         <a>
      <button type="submit">HomeShipper</button></a>
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
    {/* <div>
          <input placeholder="State" type="text" onChange={(event) => setState(event.target.value)}/>
    </div> */}
    <div className="state">
        <label>SetState:</label>
        <div onChange={(event) => setState(event.target.value)}>
        <input type="radio" value="Im going" name="state"/>
        <label  className="joinInput mt-20">Im going</label>
        <input type="radio" value="Im coming" name="state"/>
        <label className="joinInput mt-20">Im coming</label>
        <input type="radio" value="I diliveried" name="state"/>
        <label className="joinInput mt-20">I diliveried</label>
        <input type="radio" value="Cancel" name="state"/>
        <label className="joinInput mt-20">Cancel</label>
        </div>
        </div>
    <form onSubmit={SetState}>
      <button type="submit">SetState</button>
    </form>
    <div>
          <input placeholder="Report" type="text" onChange={(event) => setReport(event.target.value)}/>
    </div>
    <form onSubmit={Report}>
      <button type="submit">Report</button>
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
    
    </div>
  );
}

export default withRouter(Shipper)
