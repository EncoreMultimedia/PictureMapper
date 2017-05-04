export default class ImageSizeHandler {
  constructor(imageSizes) {
    this._imageSizes = imageSizes;
    this.counter = imageSizes.length;
  }

  set imageSizes(imageSizes) {
    this._imageSizes = imageSizes;
  }

  get imageSizes() {
    return this._imageSizes;
  }

  addImageSize(width, height) {
    this._imageSizes.push(
      {
        id: this.counter,
        points: [width,height],
        breakpoint: 'default',
        size: '100vw',
      }
    );
    this.counter++;
    this._sort();
    return this;
  }

  deleteImageSize(index) {
    this._imageSizes.slice(index, 1);
    return this;
  }

  updateWidth(index, width) {
    this._imageSizes[index].points[0] = width;
    this._sort();
    return this;
  }

  updateHeight(index, height) {
    this._imageSizes[index].points[1] = height;
    return this;
  }

  updateBreakpoint(index, breakpoint) {
    this.imageSizes[index].breakpoint = breakpoint;
    return this;
  }

  _sort() {
    this._imageSizes.sort((a,b)=>{
      return parseInt(a.points[0]) - parseInt(b.points[0]);
    });
  }
}
