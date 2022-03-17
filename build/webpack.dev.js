const webpack = require('webpack');
const { merge } = require('webpack-merge');
const webpackCommonConfig = require('./webpack.config.js');
const ESlintPlugin = require('eslint-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');

const devserverOptions = {
  static: false,
  host: '0.0.0.0',
  open: false,
  hot: true,
  port: 9866,
  liveReload: false,
  client: {
    logging: 'error',
    overlay: {
      errors: true,
      warnings: true
    },
    progress: true
  }
}

module.exports = merge(webpackCommonConfig, {
  mode: 'development',
  devtool: "eval-cheap-module-source-map", // webpack 5对这个字段组合有次序要求
  optimization: {
    moduleIds: 'named' // 替换NamedModulesPlugin
  },
  stats: 'errors-only',
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
      }
    ]
  },
  plugins: [
    new ESlintPlugin({
      extensions: ['js', 'jsx']
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here http://localhost:${devserverOptions.port}`],
        notes: ['Note that the development build is not optimized.', 'To create a production build, use npm run build']
      }
    })
  ],
  devServer: devserverOptions
})
