import path from 'path'
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { StaticRouter, matchPath } from 'react-router-dom';
import AppRoutes, { Routes } from './pages/AppRoutes';

// Initiate express
const app = express();
app.use('/static', express.static(path.resolve(__dirname, 'public')))
// Listen to get
app.get('/*', async (req, res) => {
  // Find component, then execute getInitialProps;
  const route = Routes.find(route => matchPath(req.url, route));
  const props = await (route && route.component && route.component.getInitialProps && route.component.getInitialProps());
  const initialProps = route && props && {
    [route.id]: props
  };

  const context = {};
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <AppRoutes initialProps={initialProps}/>
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
