const path = require('path');
const express = require('express');
const Twig = require('twig');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');

const app = express();

if(process.env.NODE_ENV === 'development'){
  const config = require('./webpack/webpack.development');
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'assets',
    stats: {
      color: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, 'assets')));
} else if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
}

app.set('twig options', {
  strict_variables: false,
});

app.get('/', function(req, res){
  res.render('index.twig', {
    message: 'Hello World!!',
  });
});

app.get('/about', function(req, res){
  res.render('about.twig',{
    message: 'This is about',
  });
});

app.listen(3000, '0.0.0.0',  (err) => {
  if(err) {
    console.error(err);
  }else {
    console.log('Hello 🌎 !! Listening at http://localhost:3000');
  }
});