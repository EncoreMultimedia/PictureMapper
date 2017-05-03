const path = require('path');
const express = require('express');
const Twig = require('twig');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const multer = require('multer');
const fs = require('fs');
const ImageProcessor = require('./controllers/ImageProcessor/ImageProcessor');
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

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

let upload = multer({storage: storage});

app.post('/image-export', upload.single('image'), function(req, res){

  let focalPoint = JSON.parse(req.body.focalPoint);
  let sizes = JSON.parse(req.body.sizes);

  let imageproc = new ImageProcessor(req.file, focalPoint, sizes);

  imageproc.process(function(url) {
    res.send(url);
  });
});

app.get('/download/:file', function (req, res) {
  let filePath = './output/' + req.params.file;
  res.download(filePath, req.params.file, function(err){
    if(err) {
      res.status(404).end();
    } else {
      fs.unlink(filePath, (err) => {
        if(err) return console.log(err);
      });
    }
  });
});

app.listen(3000, '0.0.0.0',  (err) => {
  if(err) {
    console.error(err);
  }else {
    console.log('Hello 🌎 !! Listening at http://localhost:3000');
  }
});