import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Login from './components/login';
import Header from './components/header';
import Dashboard from './components/dashboard';


export default (

    <HashRouter>
        <div>
          <Route exact path='/' component={Login}/>
          <Route path='/login' component={Login}/>
          <Route path='/header' component={Header}/>
          <Route path='/dashboard' component={Dashboard}/>
        </div>
    </HashRouter>
)