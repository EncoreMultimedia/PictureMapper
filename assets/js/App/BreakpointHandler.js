
export default class BreakpointHandler {
  constructor(breakpoints) {
    this._breakpoints = breakpoints;
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
  removeBreakpoint(index) {
    this._breakpoints.splice(index, 1);
  }

  //get breakpoint
  getBreakpoint(index) {
    return this._breakpoints[index];
  }

  //add breakpoint to the breakpoint list
  addBreakpoint(breakpoint) {
    this._breakpoints.push(breakpoint);
  }

  updateName(index, name) {
    console.log('hello');
    this._breakpoints[index].name = name;
    return this._breakpoints;
  }

  //updateWidth
  updateWidth(index, width) {
    this._breakpoints[index].width = width;
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
    this._breakpoints['index'].style = styleOption;
  }

}