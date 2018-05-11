import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Login from './components/login';
import Header from './components/header';
import Dashboard from './components/dashboard';
import EditProfile from './components/editprofile';


export default (

    <HashRouter>
        <div>
          <Route exact path='/' component={Login}/>
          <Route path='/login' component={Login}/>
          <Route path='/header' component={Header}/>
          <Route path='/dashboard' component={Dashboard}/>
          <Route path='/editprofile' component={EditProfile}/>
        </div>
    </HashRouter>
)