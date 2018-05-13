import React, { Component } from 'react';
import logo from '../media/xrossTrekLogo.png';
import {Link} from 'react-router-dom';

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
          <Link to='/dashboard'> <div className="icon">Home</div> </Link>
          <Link to='/editprofile'><div className="icon">Profile</div> </Link>
          <a href={'http://localhost:3210/api/destroy'} className="logout-text"><div className="icon">Logout</div></a>
        </div>

      </div>

    )
  }

}

export default Header;