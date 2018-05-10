import React, { Component } from 'react';
import logo from '../media/xrossTrekLogo.png';

class Header extends Component {
  render() {
    return (

      <div className="header">


        <div className="logo-header">
        <img src={logo} className="header-logo" alt="logo"/>

        </div>
        <div className="header-title">
        </div>

        <div className="icon-box">
          <div className="icon">Home</div>
          <div className="icon">Profile</div>
          <div className="icon">Logout</div>
        </div>

      </div>

    )
  }

}

export default Header;