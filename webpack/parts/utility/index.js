const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

exports.generateSourceMaps = function({ type }) {
  return {
    devtool: type,
  };
};

exports.clean = function(loc) {
  console.log(loc);
  return {
    plugins: [
      new CleanWebpackPlugin([loc], { root: path.resolve(__dirname , '../../../'), verbose: true }),
    ],
  };
};

exports.minifyJavaScript = function({ useSourceMap }) {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: useSourceMap,
      }),
    ],
  };
};

exports.minifyCSS = function({ options }) {
  return {
    plugins: [
      new OptimizeCSSAssetsPlugin({
        cssProcessor: cssnano,
        cssProcessorOptions: options,
      }),
    ],
  };
};