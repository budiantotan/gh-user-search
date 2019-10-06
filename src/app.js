import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './pages/AppRoutes';

const initialProps = window.__INITIAL_PROPS__;

ReactDOM.hydrate(
  <BrowserRouter>
    <AppRoutes initialProps={initialProps} />
  </BrowserRouter>,
  document.getElementById('root')
);
