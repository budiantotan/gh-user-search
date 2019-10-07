const path = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const common = {
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      }
    }]
  },
  optimization: {
    nodeEnv: isProd ? "production" : false,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          safari10: true,
        },
        extractComments: true,
      }),
    ],
  },
  devtool: isProd ? 'none' : 'inline-source-map',
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
