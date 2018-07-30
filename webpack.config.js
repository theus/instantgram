const webpack = require('webpack');
const path = require('path');
const pkg = require('./package.json')

module.exports = function (env) {
  const DEV = env && env.dev

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: DEV ? 'eval' : false,
    plugins: [
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(pkg.version),
        DEV: JSON.stringify(DEV)
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    }
  }
};
