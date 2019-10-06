import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './pages/AppRoutes';

ReactDOM.hydrate(
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>,
  document.getElementById('root')
);
