import React, { Component } from 'react';
import logo from './../logo.svg';

class Header extends Component {
  render() {
    return (
    <div>
        <nav className="navbar">
            <div className="navbar-brand">
                <img src={logo} className="App-logo" alt="logo" />
            </div>        
        </nav>
    </div>
    );
  }
}

export default Header;
