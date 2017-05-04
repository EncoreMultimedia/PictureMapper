
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

    this._sortByWidth();

    return this;
  }

  updateName(index, name) {
    this._breakpoints[index].name = name;
    return this;
  }

  //updateWidth
  updateWidth(index, width) {
    this._breakpoints[index].width = width;

    this._sortByWidth();

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

  /**
   * this.setImageSizes()
   * This method when called uses a hierarchy system that is implemented by imageSize properties and association with
   * the breakpoint that image size corresponds to. The method assigns a dynamic width using a percentage base system
   * that will then use the corresponding breakpoint to decide what the height will be using the aspect ratio.
   */
  setImageSizes(imageSizes, calculationMode) {
    let numBreakpoints = this._breakpoints.length;
    let imageBreakpointList = [];
    //Array of the image sizes referencing it breakpoints widths.

    let stopPoints = [];

    //load image breakpoints
    for(let i = 0; i < imageSizes.length; i++) {
      if(imageSizes[i].breakpoint) {
        imageBreakpointList.push(imageSizes[i].breakpoint);
      }
    }

    //load the stopping points
    for(let i = 0; i < numBreakpoints; i++) {
      for(let j = 0; j < imageBreakpointList.length; j++) {
        if (imageBreakpointList[j] === this.getBreakpoint(i).name.toLowerCase()) {
          stopPoints.push(i);
        }
      }
    }

    //loop through the stop points array and decide if it first or last and handle them differently then the common cases.
    for(let i = 0; i < stopPoints.length; i++) {
      //check if it is the first element
      if (typeof stopPoints[i - 1] === 'undefined') {
        let containerWidth = this.getBreakpoint(stopPoints[i]+1).width;
        let j = 0;

        let stopBreakpoint = stopPoints[i + 1];
        if(typeof stopBreakpoint === 'undefined')
          stopBreakpoint = numBreakpoints-1;

        while(j !== stopBreakpoint) {

          if(calculationMode === 'percentage') {
            this.updateImageWidth(j, this._calculateImageWidthByPercentage(imageSizes[i].points[0], containerWidth, this.getBreakpoint(j+1).width));
          } else if(calculationMode === 'calculation') {
            this.updateImageWidth(j, this._calculateImageWidthByCalc(this.getBreakpoint(j+1).width, imageSizes[i].size));
          }

          this.updateImageHeight(j, this._calculateImageHeightLinear(imageSizes[i].points[0] / imageSizes[i].points[1], this.getBreakpoint(j).image.width));

          j++;
        }
        //Check to see if last element in the array.
      } else if (typeof stopPoints[i + 1] === 'undefined' ) {
        let containerWidth = this.getBreakpoint(stopPoints[i]+1).width;
        let j = stopPoints[i];
        while (j < numBreakpoints - 1) {

          if(calculationMode === 'percentage') {
            this.updateImageWidth(j, this._calculateImageWidthByPercentage(imageSizes[i].points[0], containerWidth, this.getBreakpoint(j+1).width));
          } else if(calculationMode === 'calculation') {
            this.updateImageWidth(j, this._calculateImageWidthByCalc(this.getBreakpoint(j+1).width, imageSizes[i].size));
          }

          this.updateImageHeight(j, this._calculateImageHeightLinear(imageSizes[i].points[0] / imageSizes[i].points[1], this.getBreakpoint(j).image.width));

          j++;
        }
        //if not first or last element handle all common cases.
      } else {
        let containerWidth = this.getBreakpoint(stopPoints[i]+1).width;
        let j = stopPoints[i];
        while ( j !== stopPoints[i+1]) {

          if(calculationMode === 'percentage') {
            this.updateImageWidth(j, this._calculateImageWidthByPercentage(imageSizes[i].points[0], containerWidth, this.getBreakpoint(j+1).width));
          } else if(calculationMode === 'calculation') {
            this.updateImageWidth(j, this._calculateImageWidthByCalc(this.getBreakpoint(j+1).width, imageSizes[i].size));
          }

          this.updateImageHeight(j, this._calculateImageHeightLinear(imageSizes[i].points[0] / imageSizes[i].points[1], this.getBreakpoint(j).image.width));
          j++;

        }
      }
    }

    return this;
  }

  //get the image width two decimal places
  _calculateImageWidthByPercentage(imageWidth, containerWidth, newContainerWidth) {
    let sizeInPercent = Math.floor(((imageWidth / containerWidth) * 100));
    return Math.floor(((sizeInPercent * newContainerWidth) / 100));
  }

  _calculateImageWidthByCalc(breakpointWidth, size) {
    let size_equation = size.replace('calc', '').replace('px', '').replace(/([\d\.]*)vw/g, "$1/100*" + breakpointWidth).replace(/([\d\.]*)%/g, '$1/100');

    return eval(size_equation);
  }
  //get the height to the lowest whole number.
  _calculateImageHeightLinear(aspectRatio, width){
    return Math.floor(width / aspectRatio);
  }

  _sortByWidth() {
    this._breakpoints.sort((a,b)=>{
      return parseInt(a.width) - parseInt(b.width);
    });

    return this;
  }

}