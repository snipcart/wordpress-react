import React, { Component } from 'react';
import logo from './../logo.svg';

class Header extends Component {
  render() {
    return (
    <div>
        <p>
            <img src={logo} className="App-logo" alt="logo" />
        </p>
        <h1 className="App-title">
            React SPA w/ headless WP
        </h1>
    </div>
    );
  }
}

export default Header;
