import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";

import './Customer.css';

function Customer(props) {

  const Booking = async event => {
    event.preventDefault();

  }

  const Cancel = async event => {
    event.preventDefault();

  }

  const Report = async event => {
    event.preventDefault();
    
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
    <form onSubmit={Report}>
      <button type="submit">Report</button>
    </form>
    </div>
  );
}

export default withRouter(Customer)