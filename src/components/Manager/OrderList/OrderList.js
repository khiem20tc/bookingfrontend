import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

import "./OrderList.css";

function OrderList(props) {
  const [order, setOrder] = useState();
  if (localStorage.getItem("token"))
    var token =
      "HKNee " +
      localStorage
        .getItem("token")
        .substring(1, localStorage.getItem("token").length - 1);

  const getOrderList = async (event) => {
    event.preventDefault();

    await axios
      .get(`http://localhost:5000/order/`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setOrder(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = async (event) => {
    event.preventDefault();
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <p>Welcome {localStorage.getItem("userName")} to manager page</p>
      <div>
        <a href="#" onClick={logout}>
          LOGOUT
        </a>
      </div>
      <form onSubmit={getOrderList}>
        <button type="submit">GetOrderList</button>
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
            return (
              // <div>
              <tr>
                <td key={index}>{item.ID}</td>
                <td key={index}>{item.Customer}</td>
                <td key={index}>{item.Shipper}</td>
                <td key={index}>{item.Value}</td>
                <td key={index}>{item.State}</td>
                <td key={index}>{item.ReportByCustomer}</td>
                <td key={index}>{item.ReportByShipper}</td>
                <br></br>
              </tr>
              // </div>
            );
          })}
        {/* </ul> */}
      </table>
    </div>
  );
}

export default withRouter(OrderList);
