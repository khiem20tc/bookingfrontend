import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

import './Customer.css';

function Customer(props) {

  const [report, setReport] = useState('');

  if (localStorage.getItem('token'))
  var token = "HKNee " + localStorage.getItem('token').substring(1,localStorage.getItem('token').length-1);

  const Booking = async event => {
    event.preventDefault();
    
    const order = {
      "Shipper": "1a1941cb83beb06352357780cd6b2a62f4518ccf680eebc9b934bfbca29c1c6c",
      "Value": "500"
    }

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
  })
  .catch(err => {
    console.log(err)
  })
  }

  return (
    <div>
    <p>This is customer page</p>
    <form onSubmit={Booking}>
      <button type="submit">Booking</button>
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
    </div>
  );
}

export default withRouter(Customer)