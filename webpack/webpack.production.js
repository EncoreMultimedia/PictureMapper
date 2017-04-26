const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const css = require('./parts/css');
const js = require('./parts/js');
const util = require('./parts/utility');
const glob = require('glob');


const PATH = {
  root: path.resolve(__dirname, '../'),
};

const ASSETS = {
  root: PATH.root + '/assets',
  images: PATH.root + '/assets/images',
};

const PUBLIC = {
  root: PATH.root + '/public',
  css: PATH.root + '/css',
  js: PATH.root + '/js',
  images: PATH.root + '/images',
};

module.exports = merge([

  common,
  {
    entry: {
      scripts: ASSETS.root,
      images: glob.sync(ASSETS.images + '/*'),
    },
    output: {
      path: PATH.root,
      filename: 'public/js/[name].js',
      publicPath: PUBLIC.root,
    },

  },

  util.clean('public'),
  //util.minifyJavaScript({useSourceMap: true}),
  util.minifyCSS({
    options: {
      discardComments: {
        removeAll: true,
      },
    },
  }),
  //js.lintJavaScript({ include: ASSETS.root}),
  util.generateSourceMaps({ type: 'source-map' }),
  css.extractCSS({use: [
    {loader: 'css-loader', options:{importLoaders: 3, sourceMap: true}},
    'resolve-url-loader',
    'sass-loader?sourceMap',
    css.autoprefix(),
  ]}),
]);