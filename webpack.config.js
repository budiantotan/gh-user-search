const path = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');

const common = {
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      }
    }]
  }
}

const server = merge(common, {
  target: 'node',
  entry: './src/server.js',
  node: { __dirname: false },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  externals: [nodeExternals()],
});

const client = merge(common, {
  target: 'web',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    filename: 'app.js'
  }
})

module.exports = [server, client];
