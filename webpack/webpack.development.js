const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
const css = require('./parts/css');
const js = require('./parts/js');
const util = require('./parts/utility');

module.exports = merge([
  common,
  {
    plugins: [
      new webpack.NamedModulesPlugin(),
      new NyanProgressPlugin(),
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
  js.lintJavaScript({
    include: '/../assets',
    options: {
      emitWarning: true,
    },
  }),
  css.loadCSS(),
  util.generateSourceMaps({ type: 'cheap-module-eval-source-map' }),
]);