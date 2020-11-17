import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

import "./Shipper.css";

function Shipper(props) {
  const [report, setReport] = useState("");
  //const [ID, setID] = useState('');
  const [state, setState] = useState("");
  const [order_, setOrder_] = useState("");

  if (localStorage.getItem("token"))
    var token =
      "HKNee " +
      localStorage
        .getItem("token")
        .substring(1, localStorage.getItem("token").length - 1);

  var ID = "";
  if (localStorage.getItem("ID_order")) ID = localStorage.getItem("ID_order");

  const getInfoOrder = async (event) => {
    event.preventDefault();

    await axios
      .get(`http://localhost:5000/order/requestIDbyShipper`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        localStorage.setItem("ID_order", res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    ID = localStorage.getItem("ID_order");

    await axios
      .get(`http://localhost:5000/order/${ID}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setOrder_(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const SetState = async (event) => {
    event.preventDefault();

    if (localStorage.getItem("ID_order"))
      var ID = localStorage.getItem("ID_order");

    const State = {
      State: state,
    };

    await axios
      .put(`http://localhost:5000/order/${ID}/setstate`, State, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        alert("Xác nhận trạng thái thành công");
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          alert(JSON.stringify(error.response.data));
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });

    await axios
      .get(`http://localhost:5000/order/${ID}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setOrder_(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Report = async (event) => {
    event.preventDefault();

    if (localStorage.getItem("ID_order"))
      var ID = localStorage.getItem("ID_order");

    const report_ = {
      Report: report,
    };

    await axios
      .put(`http://localhost:5000/order/${ID}/report`, report_, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        alert("Report đã được ghi nhận lên hệ thống");
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          alert(JSON.stringify(error.response.data));
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });

    await axios
      .get(`http://localhost:5000/order/${ID}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setOrder_(res.data);
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

  const OrderProcessed = async (event) => {
    event.preventDefault();
    props.history.push("/shipper/OrderProcessed");
  };

  const HomeShipper = async (event) => {
    event.preventDefault();
    props.history.push("/shipper");
  };

  return (
    <div>
      <p>Welcome {localStorage.getItem("userName")} to shipper page</p>
      <div>
        <a href="#" onClick={logout}>
          LOGOUT
        </a>
      </div>
      <div id="menu">
        <ul>
          <form onSubmit={HomeShipper}>
            <a>
              <button type="submit">HomeShipper</button>
            </a>
          </form>
          <form onSubmit={OrderProcessed}>
            <a>
              <button type="submit">OrderProcessed</button>
            </a>
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
          <th>SetState</th>
          <th>Report</th>
        </tr>
        <tr>
          <td>{order_.ID}</td>
          <td>{order_.Customer}</td>
          <td>{order_.Shipper}</td>
          <td>{order_.Value}</td>
          <td>{order_.State}</td>
          <td>{order_.ReportByCustomer}</td>
          <td>{order_.ReportByShipper}</td>
          <td>
            <div className="state">
              <label></label>
              <div onChange={(event) => setState(event.target.value)}>
                <input type="radio" value="Im going" name="state" />
                <label>Im going</label>
                <br></br>
                <br></br>
                <input type="radio" value="Im coming" name="state" />
                <label>Im coming</label>
                <br></br>
                <br></br>
                <input type="radio" value="I diliveried" name="state" />
                <label>I diliveried</label>
                <br></br>
                <br></br>
                <input type="radio" value="Cancel" name="state" />
                <label>Cancel</label>
              </div>
            </div>
            <form onSubmit={SetState}>
              <button type="submit">SetState</button>
            </form>
          </td>

          <td>
            <div>
              <input
                placeholder="Report"
                type="text"
                onChange={(event) => setReport(event.target.value)}
              />
            </div>
            <form onSubmit={Report}>
              <button type="submit">Report</button>
            </form>
          </td>
          <br></br>
        </tr>
      </table>
    </div>
  );
}

export default withRouter(Shipper);
