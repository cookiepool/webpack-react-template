const webpack = require('webpack');
const webpackCommonConfig = require('./webpack.config.js');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const miniCSSExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(webpackCommonConfig, {
  mode: 'production',
  devtool: false,
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true
      }),
      new CssMinimizerPlugin({
        parallel: 4,
      })
    ],
    splitChunks: {
      cacheGroups: {
        // node_modules下的模块拆分到chunk-vendors.xxxx.js下
        vendors: {
          name: 'chunk-vendors',
          test: /[\\\/]node_modules[\\\/]/,
          priority: -10,
          chunks: 'all'
        },
        // 自己定义的公告组件超过两次引用的放在chunk-common.xxxx.js下
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'all',
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: true
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: miniCSSExtractPlugin.loader
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
            loader: miniCSSExtractPlugin.loader
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
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpackBundleAnalyzer({
      analyzerMode: 'static'
    }),
    new miniCSSExtractPlugin({
      filename: 'css/[name].[contenthash:6].css',
      chunkFilename: 'css/[name].[contenthash:6].css'
    })
  ]
})