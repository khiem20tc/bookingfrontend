import React, { useState } from "react";

import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Manager from "./components/Manager/Manager";
import Customer from "./components/Customer/Customer";
import Shipper from "./components/Shipper/Shipper";
import CustomerOrderProcessing from "./components/Customer/OrderProcessing/OrderProcessing";
import CustomerOrderProcessed from "./components/Customer/OrderProcessed/OrderProcessed";
import ManagerUserList from "./components/Manager/UserList/UserList";
import ManagerOrderList from "./components/Manager/OrderList/OrderList";
import ShipperOrderProcessed from "./components/Shipper/OrderProcessed/OrderProcessed";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={Signup} />
      {token ? (
        <Route exact path="/manager" component={Manager} />
      ) : (
        <Redirect to="/" />
      )}
      {token ? (
        <Route exact path="/manager/UserList" component={ManagerUserList} />
      ) : (
        <Redirect to="/" />
      )}
      {token ? (
        <Route exact path="/manager/OrderList" component={ManagerOrderList} />
      ) : (
        <Redirect to="/" />
      )}
      {token ? (
        <Route exact path="/customer" component={Customer} />
      ) : (
        <Redirect to="/" />
      )}
      {token ? (
        <Route
          exact
          path="/customer/OrderProcessing"
          component={CustomerOrderProcessing}
        />
      ) : (
        <Redirect to="/" />
      )}
      {token ? (
        <Route
          exact
          path="/customer/OrderProcessed"
          component={CustomerOrderProcessed}
        />
      ) : (
        <Redirect to="/" />
      )}
      {token ? (
        <Route exact path="/shipper" component={Shipper} />
      ) : (
        <Redirect to="/" />
      )}
      {token ? (
        <Route
          exact
          path="/shipper/OrderProcessed"
          component={ShipperOrderProcessed}
        />
      ) : (
        <Redirect to="/" />
      )}
    </Router>
  );
};

export default App;
