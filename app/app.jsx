import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, hashHistory} from 'react-router-dom';

// Load components
import Navbar from 'Navbar';
import Dashboard from 'Dashboard';


require('Materialize');
// require('JqueryValidate');
require('Interact');


ReactDOM.render( 
  <BrowserRouter history={hashHistory}>
    <div>
        {/* <Navbar /> */} 
        <Route exact path="/" component={() => (<Dashboard />)} />
    </div>
  </BrowserRouter>,
  document.getElementById('app')
);
