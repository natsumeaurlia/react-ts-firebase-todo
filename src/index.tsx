import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './pages/App';
import Login from './pages/Login';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <React.Fragment>
        <Route exact path='/' component={App} />
        <Route exact path='/login' component={Login} />
      </React.Fragment>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
