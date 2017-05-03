const easyimg = require('easyimage');
const shortid = require('shortid');
const fs = require('fs');
const archiver = require('archiver');
const rimraf = require('rimraf');

class ImageProcessor {
  constructor(file, focalPoint, sizes) {
    this.file = file;
    this.focalPoint = focalPoint;
    this.sizes = sizes;
    this.id = shortid.generate();
  }

  process(callback) {

    easyimg.info(this.file.path).then((file) => {
      let image = {
        path: this.file.path,
        width: file.width,
        height: file.height,
        ext: file.type,
      };

      this.generateImage(image, this.focalPoint, this.sizes, 0, () => {
        rimraf(image.path, (err) => {
          if(err) return console.log(err);
        });
        this.generateZip((url) => {
          return callback(url);
        });
      });

    }, function (err) {
      console.log(err);
    });
  }

  generateImage(image, focalPoint, sizes, index, callback) {
    let resHeight=0, resWidth=0;

    if(sizes[index].width > sizes[index].height) {
      resWidth = sizes[index].width;
      resHeight = image.height / image.width * sizes[index].width;
    } else {
      resWidth = image.width / image.height * sizes[index].height;
      resHeight = sizes[index].height;
    }

    let x=resWidth * focalPoint.x / 100 - resWidth / 2;
    let y=resHeight * focalPoint.y / 100 - resHeight / 2;

    let widthDifference = resWidth - (x+sizes[index].width);
    if(widthDifference < 0) {
      x = x + widthDifference;
    }

    let heightDifference = resHeight - (y+sizes[index].height);
    if(heightDifference < 0) {
      y = y + heightDifference;
    }

    easyimg.rescrop({
      src:image.path,
      dst:'./output/' + this.id + '/' + sizes[index].name + '.' + image.ext,
      width:resWidth, height:resHeight,
      cropwidth:sizes[index].width, cropheight:sizes[index].height,
      gravity: 'Center',
      x:x, y:y,
    }).then(() => {
      if(sizes.length == index+1) {
        return callback();
      } else {
        this.generateImage(image, focalPoint, sizes, index+1, callback);
      }
    }, function (err) {
      console.log(err);
    });
  }

  generateZip(callback) {
    let imagePath = './output/' + this.id + '/';
    let output = fs.createWriteStream('output/' + this.id + '.zip');
    let archive = archiver('zip', {
      store: true, // Sets the compression method to STORE.
    });

    archive.pipe(output);

    output.on('close', () => {
      rimraf(imagePath, (err) => {
        if(err) return console.log(err);
      });
      return callback('/download/' + this.id + '.zip');
    });

    archive.directory(imagePath, 'images');

    archive.finalize();
  }
}

module.exports = ImageProcessor;