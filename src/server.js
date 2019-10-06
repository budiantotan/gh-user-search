import path from 'path'
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { StaticRouter, matchPath } from 'react-router-dom';
import AppRoutes from './pages/AppRoutes';
import { getComponentInitialProps } from './utils/initialProps';
import { Provider } from "react-redux";
import createStore from "./redux/store";

// Initiate express
const app = express();
app.use('/static', express.static(path.resolve(__dirname, 'public')))
// Listen to get
app.get('/*', async (req, res) => {
  // Inititate redux store
  const store = createStore();

  // Find component, then execute getInitialProps;
  const { params, getInitialProps, routeId } = getComponentInitialProps(req.url);
  const initialProps = {};

  if (typeof getInitialProps === 'function') {
    const props = await getInitialProps({ params, store });
    Object.assign(initialProps, { [routeId]: props });
  }

  const context = {};
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <Provider store={store}>
        <AppRoutes initialProps={initialProps} />
      </Provider>
    </StaticRouter>
  );

  if (context.url) {
    res.redirect(301, context.url);
  } else {
    const response = `
      <!doctype html>
      <html>
        <head>
          <title>Github user search</title>
          <script>
            window.__INITIAL_PROPS__ = ${JSON.stringify(initialProps)};
            window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())};
          </script>
        </head>
        <body>
          <div id="root">${html}</div>
        </body>
        <script src="/static/app.js"></script>
      </html>
    `;
    res.send(response);
  }
}).listen(3000, () => {
  console.log('Started at 3000');
});
