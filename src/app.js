import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import createStore from "./redux/store";
import AppRoutes from './pages/AppRoutes';

const initialProps = window.__INITIAL_PROPS__;
const initialState = window.__INITIAL_STATE__;
const store = createStore(initialState);

ReactDOM.hydrate(
  <BrowserRouter>
    <Provider store={store}>
      <AppRoutes initialProps={initialProps} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

