const webpack = require('webpack');
const { merge } = require('webpack-merge');
const webpackCommonConfig = require('./webpack.config.js');
const path = require('path');

module.exports = merge(webpackCommonConfig, {
  mode: 'development',
  devtool: "eval-cheap-module-source-map", // webpack 5对这个字段组合有次序要求
  optimization: {
    moduleIds: 'named' // 替换NamedModulesPlugin
  },
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
                localIdentName: '[name]__[local]--[fullhash:base64:5]'
              }
            }
          },
          {
            loader: 'sass-loader'
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
                localIdentName: '[name]__[local]--[fullhash:base64:5]',
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
  plugins: [],
  devServer: {
    host: 'local-ipv4',
    open: false,
    hot: true,
    port: 9866,
    liveReload: false,
    client: {
      logging: 'info',
      overlay: {
        errors: true,
        warnings: true
      },
      progress: true
    }
  }
})
