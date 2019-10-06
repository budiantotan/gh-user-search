import path from 'path'
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import Hello from './components/Hello';

// Initiate express
const app = express();
app.use('/static', express.static(path.resolve(__dirname, 'public')))
// Listen to get
app.get('/', (req, res) => {
  const html = ReactDOMServer.renderToString(<Hello />);
  const response = `
    <!doctype html>
    <html>
      <head>
        <title>Github user search</title>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
      <script src="/static/app.js" />
    </html>
  `;

  res.send(response);
}).listen(3000, () => {
  console.log('Started at 3000');
});
