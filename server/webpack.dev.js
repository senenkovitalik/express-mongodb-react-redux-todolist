const merge = require('webpack-merge');
const common = require('./webpack.common');
const NodemonPlugin = require('nodemon-webpack-plugin');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new NodemonPlugin({
      watch: path.resolve(__dirname, 'dist')
    })
  ]
});
