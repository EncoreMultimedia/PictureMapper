const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const glob = require('glob');
const css = require('./parts/css');
const js = require('./parts/js');
const img = require('./parts/images');


module.exports = merge([
  {
    entry: [
      'webpack-hot-middleware/client?reload=true',
      path.resolve(__dirname, '../assets'),
    ],
    output: {
      path: path.resolve(__dirname, 'assets'),
      filename: 'js/scripts.js',
      publicPath: '/',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
  },
  css.lintCSS({include: '/../assets/'}),
  img.loadImages({
    options: {
      limit: 15000,
      name: '/images/[name].[ext]',
    },
  }),
  js.loadJavaScript({include: '/../assets'}),
]);


