const merge = require('webpack-merge');
const common = require('./webpack.common');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(css|png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'ignore-loader'
        }
      },
    ]
  },
  plugins: [
    new NodemonPlugin()
  ]
});
