import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Redirect, Route } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Blogs from './Blogs';

import './Login.css';
import BlogPage from './BlogPage';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/blog" component={Blogs} />
      <Route exact path="/blogPage" component={BlogPage} />
      {/* <Route component={NotFound}/> */}
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
);
