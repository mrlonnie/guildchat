  
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <section>
        <h1>Guild Chat</h1>
        <div>
          <Link to="/register">Create New Account</Link>
          <Link to="/login">Login to Your Account</Link>
        </div>
      </section>
    )
  }
}