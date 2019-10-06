import path from 'path'
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom';
import AppRoutes from './pages/AppRoutes';

// Initiate express
const app = express();
app.use('/static', express.static(path.resolve(__dirname, 'public')))
// Listen to get
app.get('/*', (req, res) => {
  const context = {};
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <AppRoutes />
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
