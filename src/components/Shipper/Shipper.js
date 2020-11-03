import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

import './Shipper.css';

function Shipper(props) {

  const [report, setReport] = useState('');
  const [ID, setID] = useState('');
  const [state, setState] = useState('');

  if (localStorage.getItem('token'))
  var token = "HKNee " + localStorage.getItem('token').substring(1,localStorage.getItem('token').length-1);

  const getInfoOrder = async event => {
    event.preventDefault();

    await axios.get(`http://localhost:5000/order/${ID}`)
    .then(res => {
      console.log(res);
      console.log(res.data);
      document.getElementById("order_").innerHTML = JSON.stringify(res.data);
    })
    .catch(err => {
      console.log(err)
    })
  }

 const SetState = async event => {
   event.preventDefault();

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
    
    // if(localStorage.getItem('ID_order'))
    // var ID = localStorage.getItem('ID_order');

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
    <p>This is shipper page</p>
    <div>
          <input placeholder="ID" type="text" onChange={(event) => setID(event.target.value)}/>
    </div>
    <p id="order_"></p>
    <form onSubmit={getInfoOrder}>
      <button type="submit">GetInfoOrder</button>
    </form>
    <div>
          <input placeholder="State" type="text" onChange={(event) => setState(event.target.value)}/>
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
    </div>
  );
}

export default withRouter(Shipper)
