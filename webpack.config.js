'use strict';

const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const devServer = require('./dev.server');

const NODE_ENV = process.env.NODE_ENV || 'development';
const devMode = (NODE_ENV === 'development');
const assetsPath = path.resolve(__dirname, './assets');
const srcPath = path.resolve(__dirname, './src');

module.exports = {
  devServer,
  mode: NODE_ENV,//development,production
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    chunkFilename: '[name].chunk.js'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@src': srcPath,
      '@assets': assetsPath
    }
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true
        }
      },{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },{
        test: /\.(png|gif|jpe?g|ttf)$/,
        use: [{
            loader: 'url-loader',
            options: {
              limit: 1024 * 4,
              name: './[name].[hash:7].[ext]',
            }
          }
        ]
      },{
        test: /\.(sa|sc|c|le)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },{
        test: require.resolve('zepto'),
        use: ['exports-loader?window.Zepto','script-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'vuejs-example',
      template: './src/index.html'
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new OptimizeCSSAssetsPlugin({})
  ]
};