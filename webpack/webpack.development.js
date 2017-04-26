const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const css = require('./parts/css');
const js = require('./parts/js');
const util = require('./parts/utility');

module.exports = merge([
  common,
  {
    plugins: [
      new webpack.NamedModulesPlugin(),
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