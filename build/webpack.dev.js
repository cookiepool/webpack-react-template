const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackCommonConfig = require('./webpack.config.js');
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');

module.exports = webpackMerge(webpackCommonConfig, {
  mode: 'development',
  devtool: "cheap-module-eval-source-map",
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]'
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('dart-sass')
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
                auto: /\.redux-study\.\w+$/i
              }
            }
          }
        ]
      },
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new friendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: 127.0.0.1:9866`]
      }
    })
  ],
  devServer: {
    host: '0.0.0.0',
    hot: true,
    port: 9866,
    contentBase: './dist',
    clientLogLevel: 'error',
    overlay: {
      errors: true,
      warnings: true
    },
    quiet: true
  }
})
