const path = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: path.resolve(__dirname, '../src/index.jsx')
    // index: path.resolve(__dirname, '../redux-study/redux-default/index.jsx')
    // index: path.resolve(__dirname, '../redux-study/react-redux/index.jsx')
    // index: path.resolve(__dirname, '../redux-study/redux-thunk/index.jsx')
    // index: path.resolve(__dirname, '../redux-study/redux-saga/index.jsx')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[fullhash:6].js',
    chunkFilename: 'js/[name].[chunkhash:6].js',
    assetModuleFilename: 'assets/[name].[hash][ext][query]',
    publicPath: '/' 
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'React Template',
      template: path.resolve(__dirname, '../index.html'),
      filename: path.resolve(__dirname, '../dist/index.html')
    }),
    new copyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, '../public'),
        to: path.resolve(__dirname, '../dist')
      }]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    extensions: ['*', '.js', '.jsx']
  }
}