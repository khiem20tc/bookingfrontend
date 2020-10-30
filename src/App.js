import React from 'react';

import Login from './components/Login/Login';
import Signup from './components/Signup/Signup'
import Manager from './components/Manager/Manager';
import Customer from './components/Customer/Customer';
import Shipper from './components/Shipper/Shipper';

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route path="/manager" component={Manager} />
      <Route path="/customer" component={Customer} />
      <Route path="/shipper" component={Shipper} />
    </Router>
  );
}

export default App;
