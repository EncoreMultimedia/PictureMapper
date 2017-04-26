import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Settings from './Settings/Settings';
import OutputTable from './OutputTable/OutputTable';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      breakpoints:  this.props.breakpoints,
      imageSizes:   this.props.imageSizes,
      multipliers:  this.props.multipliers,
      breakpointList: this.createBreakpointList(this.props.breakpoints),
    };
    //this.setImageSize();
    //call to make a list of breakpoints ot be used with ImageSizes
    //this.breakpointHandler();

  }

  componentDidMount() {
    this.setImageSize();
  }

  //sort from least to greatest
  sortImagePoints(points) {
    return points.sort(function(a,b) {
      return a[0] - b[0];
    });
  }

  createBreakpointList(breakpoints) {
    let breakpointList = [];
    //Push breakpoint name onto breakpointList
    for(let i = 1; i < breakpoints.length; i++) {
      breakpointList.push(breakpoints[i].name);
    }
    return breakpointList;
  }

  onChangeImageSelectBreakpoint (id, value) {
    let imageSizes = this.state.imageSizes;
    imageSizes[id +1].breakpoint = value.toString();
    this.setState({imageSizes: imageSizes});
    this.setImageSize();
  }
  /**
   * this.setImageSize()
   * This method when called uses a hierarchy system that is implemented by imageSize properties and association with
   * the breakpoint that image size corresponds to. The method assigns a dynamic width using a percentage base system
   * that will then use the corresponding breakpoint to decide what the height will be using the aspect ratio.
   */
  setImageSize() {
    let imageSize = this.state.imageSizes;
    let breakpoints = this.state.breakpoints;
    let imageBreakpointList = [];
    //Array of the image sizes referencing it breakpoints widths.
    let stopPoint = [];
    //load image breakpoints
    for(let i = 1; i < imageSize.length; i++) {
      if(imageSize[i].breakpoint) {
        imageBreakpointList.push(imageSize[i].breakpoint);
      }
    }
    //load the stopping points
    for(let i = 0; i < this.state.breakpointList.length; i++) {
      for(let j = 0; j < imageBreakpointList.length; j++) {
        if (imageBreakpointList[j] === this.state.breakpointList[i].toLowerCase()) {
          stopPoint.push(i);
        }
      }
    }
    //loop through the stop points array and decide if it first or last and handle them differently then the common cases.
    for(let i = 0; i < stopPoint.length; i++) {
      //check if it is the first element
      if (typeof stopPoint[i - 1] === 'undefined') {
        let containerWidth;
        let k = 1;
        let j = 0;
        //while j doesn't equal the stopping point get the container width and then figure out the width and height.
        while(j !== stopPoint[i + 1]) {
          for(let m = 0; m < imageBreakpointList.length; m++) {
            if(imageSize[i + 1].breakpoint === imageBreakpointList[m]) {
              containerWidth = breakpoints[m + 1].width;
            }
          }

          breakpoints[k].image.width = Math.floor(this.calculateImageWidth(imageSize[i + 1].points[0], containerWidth, breakpoints[k].width));
          breakpoints[k].image.height = Math.floor(this.calculateImageHeight(imageSize[i + 1].points[0] / imageSize[i + 1].points[1], breakpoints[k].image.width));

          j++; k++;
        }
        //Check to see if last element in the array.
      }else if (typeof stopPoint[i + 1] === 'undefined' ) {
        let containerWidth;
        let k = stopPoint[i];
        while (k < breakpoints.length - 1) {
          for(let m = 0; m < this.state.breakpointList.length; m++) {
            if(this.state.breakpointList[m].toLowerCase() === imageSize[i + 1].breakpoint) {
              containerWidth = breakpoints[m + 1].width;
            }
          }
          //console.log(imageSize[i + 1]);
          breakpoints[k + 1].image.width = Math.floor(this.calculateImageWidth(imageSize[i + 1].points[0], containerWidth, breakpoints[k + 1].width));
          breakpoints[k + 1].image.height = Math.floor(this.calculateImageHeight(imageSize[i + 1].points[0] / imageSize[i + 1].points[1], breakpoints[k + 1].image.width));
          k++;
        }
        //if not first or last element handle all common cases.
      } else {
        let containerWidth;
        let k = stopPoint[i];
        let j = stopPoint[i + 1];
        while ( k !== j) {
          //console.log(imageSize[i + 1]);
          for(let m = 0; m < this.state.breakpointList.length; m++) {
            if(this.state.breakpointList[m].toLowerCase() === imageSize[i + 1].breakpoint) {
              containerWidth = breakpoints[m + 1].width;
            }
          }
          breakpoints[k + 1].image.width = Math.floor(this.calculateImageWidth(imageSize[i + 1].points[0], containerWidth, breakpoints[k + 1].width));
          breakpoints[k + 1].image.height = Math.floor(this.calculateImageHeight(imageSize[i + 1].points[0] / imageSize[i + 1].points[1], breakpoints[k + 1].image.width));
          k++;

        }
      }
    }
    //set the breakpoint that where changed to the state.
    this.setState({breakpoints: breakpoints});
  }
  //get the image width two decimal places
  calculateImageWidth(imageWidth, containerWidth, newContainerWidth) {
    let sizeInPercent = Math.round(((imageWidth / containerWidth) * 100) * 100) / 100;
    return Math.round(((sizeInPercent * newContainerWidth) / 100) * 100) / 100;
  }
  //get the height to the lowest whole number.
  calculateImageHeight(aspectRatio, width){
    return Math.floor(width / aspectRatio);
  }

  render() {
    return (
      <article id="main" className="main">
        <div className="row">
          <Settings  breakpoints={this.state.breakpoints} imageSizes={this.state.imageSizes} multipliers={this.state.multipliers} breakpointList={this.state.breakpointList} callbacks={this.onChangeImageSelectBreakpoint.bind(this)}/>
          <OutputTable breakpoints={this.state.breakpoints} multipliers={this.state.multipliers} />
        </div>
      </article>
    );
  }
}

App.propTypes = {
  breakpoints: PropTypes.arrayOf(PropTypes.object),
  imageSizes: PropTypes.arrayOf(PropTypes.object),
  multipliers: PropTypes.arrayOf(PropTypes.object),
};