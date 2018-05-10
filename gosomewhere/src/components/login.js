import React, { Component } from 'react';
import logo from '../media/xrossTrekLogo.png';




class Login extends Component {
    render(){
        return(
            <div className="login-main-container">
            
            
           <div>
             <img className="home-page-logo" alt="logo" src={logo}/>  
            </div> 
            
            <div className="login-button-container">
            <a href={process.env.REACT_APP_LOGIN}><button className="enter-site-button" >Click to Enter</button></a>
            </div>

            </div>
        )
    }
}

export default Login