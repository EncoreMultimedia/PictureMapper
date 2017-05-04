
export default class BreakpointHandler {
  constructor(breakpoints) {
    this._breakpoints = breakpoints;
    this.counter = breakpoints.length;
  }

  // get breakpoint list
  get breakpoints() {
    return this._breakpoints;
  }

  // set breakpoint list
  set breakpoints(breakpoints) {
    this._breakpoints = breakpoints;
  }

  //remove Breakpoint using index
  deleteBreakpoint(index) {
    this._breakpoints.splice(index, 1);
    return this;
  }

  //get breakpoint
  getBreakpoint(index) {
    return this._breakpoints[index];
  }

  //add breakpoint to the breakpoint list
  addBreakpoint(name, width) {
    //add breakpoint to list
    this._breakpoints.push({
      id: this.counter,
      name: name,
      width: width,
      image: {
        width: 0,
        height: 0,
      },
      style: 'focal_point_scale_and_crop',
    });

    // increment the counter
    this.counter++;

    return this;
  }

  updateName(index, name) {
    this._breakpoints[index].name = name;
    return this;
  }

  //updateWidth
  updateWidth(index, width) {
    this._breakpoints[index].width = width;
    return this;
  }

  //updateImageWidth
  updateImageWidth(index, width) {
    this._breakpoints[index].image.width = width;
  }

  //updateImageHeight
  updateImageHeight(index, height) {
    this._breakpoints[index].image.height = height;
  }

  //updateStyle
  updateStyleOption(index, styleOption) {
    this._breakpoints[index].style = styleOption;
    return this;
  }

}