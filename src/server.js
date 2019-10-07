import path from 'path'
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { Helmet } from 'react-helmet';
import AppRoutes from './pages/AppRoutes';
import { getComponentInitialProps } from './utils/initialProps';
import createStore from "./redux/store";

// Initiate express
const app = express();
app.use('/static', express.static(path.resolve(__dirname, 'public')))
app.use('/robots.txt', (req, res) => {
  res.type('text/plain')
  res.send("User-agent: *\nDisallow: /"); // Disallow for now
});

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
  const helmet = Helmet.renderStatic();

  if (context.url) {
    res.redirect(301, context.url);
  } else {
    const response = `
      <!doctype html>
      <html lang="en">
        <head>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script>
            window.__INITIAL_PROPS__ = ${JSON.stringify(initialProps)};
            window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())};
          </script>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
        </head>
        <body style="background: #f4f9f4;">
          <div id="root">${html}</div>
        </body>
        <script defer src="/static/app.js"></script>
      </html>
    `;
    res.send(response);
  }
}).listen(process.env.PORT || 5000, () => {
  console.log('Started at 3000');
});
