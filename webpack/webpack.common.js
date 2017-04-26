const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
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
      new NyanProgressPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
          WEBPACK: true,
        },
      }),
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


