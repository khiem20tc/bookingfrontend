import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

import './OrderProcessing.css';

function OrderProcessing(props) {
    
    const[order,setOrder] = useState();
    const [report, setReport] = useState('');

    if (localStorage.getItem('token'))
    var token = "HKNee " + localStorage.getItem('token').substring(1,localStorage.getItem('token').length-1);

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

    const getInfoOrder = async event => {
        event.preventDefault();
    
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

      const Cancel = async (event,ID) => {
        event.preventDefault();
    
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

      const Report = async (event,ID) => {
        event.preventDefault();
        
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
          <li key={index}>Cancel 
          <form onSubmit={event => Cancel(event, item.ID)}>
          <button type="submit">Cancel</button>
          </form>
          </li>
          <li key={index}>Report
          <div>
          <input placeholder="Report" type="text" onChange={(event) => setReport(event.target.value)}/>
          </div>
          <form onSubmit={event => Report(event,item.ID)}>
          <button type="submit">Report</button>
          </form>
          </li>
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

export default withRouter(OrderProcessing);