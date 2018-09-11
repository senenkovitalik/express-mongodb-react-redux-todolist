const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname),
  entry: './src/index.js',
  target: 'node',
  externals: [nodeExternals({
    whitelist: [/^bootstrap/, /^@fortawesome/]
  })],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css|png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'ignore-loader'
        }
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname)
    })
  ],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  }
};
