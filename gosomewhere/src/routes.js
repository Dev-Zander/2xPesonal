import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Login from './components/login';



export default (

    <HashRouter>
        <div>
          <Route path='/login' component={Login}/>

        </div>
    </HashRouter>
)