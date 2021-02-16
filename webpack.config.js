/* eslint-disable */
const webpack = require('webpack')
const path = require('path')
const pkg = require('./package.json')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = function (env) {
  const DEV = env && env.dev

  return {
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: DEV ? 'eval' : false,
    plugins: [
      new webpack.DefinePlugin({
        'process.env.VERSION': JSON.stringify(pkg.version),
        'process.env.DEV': JSON.stringify(DEV)
      }),
      new ESLintPlugin()
    ],
    resolve: {
      extensions: [".ts"]
    },
    module: {
      rules: [
        {
          test: /.tsx?$/,
          use: [
            { loader: 'ts-loader' }
          ]
        },
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
}
