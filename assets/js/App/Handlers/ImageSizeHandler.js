export default class ImageSizeHandler {
  /**
   *
   * @param imageSizes
   */
  constructor(imageSizes) {
    this._imageSizes = imageSizes;
    this.counter = imageSizes.length;
  }

  /**
   *
   * @param imageSizes
   */
  set imageSizes(imageSizes) {
    this._imageSizes = imageSizes;
  }

  /**
   *
   * @returns {*}
   */
  get imageSizes() {
    return this._imageSizes;
  }

  /**
   *
   * @param width
   * @param height
   * @returns {ImageSizeHandler}
   */
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

  /**
   *
   * @param index
   * @returns {ImageSizeHandler}
   */
  deleteImageSize(index) {
    this._imageSizes.slice(index, 1);
    return this;
  }

  /**
   *
   * @param index
   * @param width
   * @returns {ImageSizeHandler}
   */
  updateWidth(index, width) {
    this._imageSizes[index].points[0] = width;
    this._sort();
    return this;
  }

  /**
   *
   * @param index
   * @param height
   * @returns {ImageSizeHandler}
   */
  updateHeight(index, height) {
    this._imageSizes[index].points[1] = height;
    return this;
  }

  /**
   *
   * @param index
   * @param breakpoint
   * @returns {ImageSizeHandler}
   */
  updateBreakpoint(index, breakpoint) {
    this.imageSizes[index].breakpoint = breakpoint;
    return this;
  }

  /**
   *
   * @private
   */
  _sort() {
    this._imageSizes.sort((a,b)=>{
      return parseInt(a.points[0]) - parseInt(b.points[0]);
    });
  }
}
