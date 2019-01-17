import React, { Component } from "react";

class Header extends Component {
  render() {
    const logo = "https://snipcart.com/images/snipcart_logo.svg";
    return (
      <div>
        <p>
          <img src={logo} className="App-logo" alt="logo" />
        </p>
        <h1 className="App-title">React SPA w/ headless WP</h1>
      </div>
    );
  }
}

export default Header;
