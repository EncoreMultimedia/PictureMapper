import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Settings from './Settings/Settings';
import OutputTable from './OutputTable/OutputTable';
import BreakpointHandler from './BreakpointHandler';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.breakpointsHandler =  new BreakpointHandler(this.props.breakpoints);

    this.state = {
      breakpoints: this.breakpointsHandler.breakpoints,
      breakpointCounter: this.props.breakpoints.length - 1,
      imageSizes:   this.props.imageSizes,
      imageSizesCounter: this.props.imageSizes.length - 1,
      multipliers:  this.props.multipliers,
      multipliersCounter: this.props.multipliers.length - 1,
      breakpointList: this.createBreakpointList(this.props.breakpoints),
      calculationMode: 'percentage',
      imageStyleShown: false,
      downloads: {
        imageExport: null,
      },
    };

    console.log('%c    Presented By: EncoreMultimedia.com   ', 'background: #fff; color: #0278ff  ');
  }

  componentDidMount() {
    this.setImageSizes();
  }

  //updates the breakpoint using the breakpoint handler class
  breakpointUpdate(property, index, value) {
    if(property === 'name') {
      this.setState({
        breakpoints: this.breakpointsHandler.updateName(index, value).breakpoints,
        breakpointList: this.createBreakpointList(this.breakpointsHandler.breakpoints),
      });
    }
    if(property === 'width') {
      this.setState(
        {breakpoints: this.sortByWidth(this.breakpointsHandler.updateWidth(index, value).breakpoints)},
        ()=>this.setImageSizes()
      );
    }
  }

  //add a breakpoint using the breakpoint handler class
  addBreakpoint(name, width) {
    this.setState(
      {
        breakpoints: this.sortByWidth(this.breakpointsHandler.addBreakpoint(name, width).breakpoints),
        breakpointList: this.createBreakpointList(this.breakpointsHandler.breakpoints),
      },
      this.setImageSizes()
    );

  }

  //delete a breakpoint using the breakpoint handler class
  deleteBreakpoint(index) {
    let imageSizes = this.state.imageSizes;

    let lowerName =  this.breakpointsHandler.getBreakpoint(index).name.toLowerCase();
    let newLastLowerName;

    if(typeof  this.breakpointsHandler.breakpoints[index + 1] === 'undefined') {
      newLastLowerName = this.breakpointsHandler.getBreakpoint(index).name.toLowerCase();
    }

    // Change image styles to default if they are using this breakpoint or
    // the previous breakpoint if we're deleting the last in the list
    for(let image in imageSizes) {
      if(imageSizes[image].breakpoint === lowerName || imageSizes[image].breakpoint === newLastLowerName) {
        imageSizes[image].breakpoint = 'default';
      }
    }

    this.setState(
      {
        breakpoints: this.breakpointsHandler.deleteBreakpoint(index).breakpoints,
        breakpointList: this.createBreakpointList(this.breakpointsHandler.breakpoints),
        imageSizes: imageSizes,
      }
    );

    // for(let i = 1; i < this.breakpointsHandler.breakpoints.length; i++) {
    //   if(parseInt(id) === parseInt(this.breakpointsHandler.breakpoints[i].id)) {
    //
    //
    //     let lowerName = breakpoints[i].name.toLowerCase();
    //     let newLastLowerName;
    //
    //     // If we're deleting the last breakpoint in the list
    //     if(typeof breakpoints[i+1] == 'undefined') {
    //       // Grab the "new" last breakpoint name
    //       newLastLowerName = breakpoints[i-1].name.toLowerCase();
    //     }
    //
    //     // Change image styles to default if they are using this breakpoint or
    //     // the previous breakpoint if we're deleting the last in the list
    //     for(let j = 1; j < imageSizes.length; j++) {
    //       if(imageSizes[j].breakpoint == lowerName || imageSizes[j].breakpoint == newLastLowerName) {
    //         console.log(imageSizes[j]);
    //         imageSizes[j].breakpoint = 'default';
    //       }
    //     }
    //
    //     // breakpoints.splice(i, 1);
    //     // this.setState({breakpoints: breakpoints, breakpointList: this.createBreakpointList(breakpoints), imageSizes: imageSizes});
    //   }
    // }
  }

  onChangeBreakpointImageStyle(index, value) {
    this.setState({breakpoints: this.breakpointsHandler.updateStyleOption(index, value).breakpoints});
  }

  imageSizeUpdate(value, property, imageSizeId) {
    let imageSizes = this.state.imageSizes;

    for(let i = 1; i < imageSizes.length; i++) {
      if(property === 'width' && imageSizes[i].id === imageSizeId) {
        imageSizes[i].points[0] = parseInt(value.target.value);
      }

      if(property === 'height' && imageSizes[i].id === imageSizeId) {
        imageSizes[i].points[1] = parseInt(value.target.value);
      }
    }

    if(property === 'width') {
      imageSizes = this.sortByImageWidth(imageSizes);
    }

    this.setState({imageSizes: imageSizes});
    this.setImageSizes();

  }

  addImageSize(width, height) {
    let imageSizes = this.state.imageSizes;
    //add new object
    imageSizes.push({
      id: this.state.imageSizesCounter,
      points: [width,height],
      breakpoint: this.state.breakpoints[1].name,
      size: '100vw',
    });
    imageSizes = this.sortByWidth(imageSizes);
    this.setState({imageSizes: imageSizes,imageSizesCounter: this.state.imageSizesCounter + 1});
    this.setImageSizes();
  }

  deleteImageSize(id) {
    let imageSizes = this.state.imageSizes;
    for(let i = 1; i < imageSizes.length; i++) {
      if(parseInt(id) === parseInt(imageSizes[i].id)) {
        imageSizes.splice(i, 1);
        this.setState({imageSizes: imageSizes}, ()=> this.setImageSizes());
      }
    }
  }

  multiplierUpdate(value, changedInput, id) {
    let multipliers = this.state.multipliers;

    for(let i = 1; i < multipliers.length; i++) {
      if(changedInput === 'name' && parseInt(id, 10) === parseInt(multipliers[i].id)) {
        multipliers[i].name = value;
      }
      if(changedInput === 'value' && parseInt(id, 10) === parseInt(multipliers[i].id)) {
        multipliers[i].value = value;
      }
    }

    this.setState({multipliers: multipliers});
  }

  addMultiplier(name, value) {
    let multipliers = this.state.multipliers;
    //add new object
    multipliers.push(  {
      id: this.state.multipliersCounter,
      name: name,
      value: value,
    });

    this.setState({multipliers: multipliers,multipliersCounter: this.state.multipliersCounter + 1});
  }

  deleteMultiplier(id) {
    let multipliers = this.state.multipliers;
    for(let i = 1; i < multipliers.length; i++) {
      if(parseInt(id) === parseInt(multipliers[i].id)) {
        multipliers.splice(i, 1);
        this.setState({multipliers: multipliers});
      }
    }
  }

  sortByWidth(arr) {
    arr.sort((a,b)=>{
      if(a.header || b.header) {
        return null;
      } else {
        return parseInt(a.width) - parseInt(b.width);
      }
    });
    return arr;
  }

  sortByImageWidth(arr) {
    arr.sort((a,b)=>{
      if(a.header || b.header) {
        return null;
      } else {
        return parseInt(a.points[0]) - parseInt(b.points[0]);
      }
    });
    return arr;
  }

  createBreakpointList(breakpoints) {
    let breakpointList = [];
    //Push breakpoint name onto breakpointList
    for(let i = 1; i < breakpoints.length; i++) {
      breakpointList.push(breakpoints[i].name);
    }
    return breakpointList;
  }

  onChangeCalculationMode(mode) {
    this.setState({calculationMode: mode.toString()}, ()=>this.setImageSizes());
  }

  onChangeImageSelectBreakpoint (id, value) {
    let imageSizes = this.state.imageSizes;
    for(let i = 1; i < imageSizes.length; i++) {
      if(imageSizes[i].id === id) {
        imageSizes[i].breakpoint = value.toString();
      }
    }
    this.setState({imageSizes: imageSizes});
    this.setImageSizes();
  }

  onChangeCalculation(id, value) {
    let imageSizes = this.state.imageSizes;
    imageSizes[id +1].size = value.toString();
    this.setState({imageSizes: imageSizes});
    this.setImageSizes();
  }




  onChangeImageStyleShown(value) {
    this.setState({imageStyleShown: value});
  }

  /**
   * this.setImageSizes()
   * This method when called uses a hierarchy system that is implemented by imageSize properties and association with
   * the breakpoint that image size corresponds to. The method assigns a dynamic width using a percentage base system
   * that will then use the corresponding breakpoint to decide what the height will be using the aspect ratio.
   */
  setImageSizes() {
    let imageSizes = this.state.imageSizes;
    let breakpoints = this.state.breakpoints;
    let imageBreakpointList = [];
    //Array of the image sizes referencing it breakpoints widths.

    let stopPoints = [];

    //load image breakpoints
    for(let i = 0; i < imageSizes.length; i++) {
      if(imageSizes[i].breakpoint) {
        imageBreakpointList.push(imageSizes[i].breakpoint);
      }
    }

    console.log(imageBreakpointList);

    //load the stopping points
    for(let i = 0; i < breakpoints.length; i++) {
      for(let j = 0; j < imageBreakpointList.length; j++) {
        if (imageBreakpointList[j] === breakpoints[i].name.toLowerCase()) {
          stopPoints.push(i);
        }
      }
    }

    console.log(stopPoints);

    //loop through the stop points array and decide if it first or last and handle them differently then the common cases.
    for(let i = 0; i < stopPoints.length; i++) {
      //check if it is the first element
      if (typeof stopPoints[i - 1] === 'undefined') {
        let containerWidth = breakpoints[stopPoints[i]+1].width;
        let j = 0;

        let stopBreakpoint = stopPoints[i + 1];
        if(typeof stopBreakpoint === 'undefined')
          stopBreakpoint = breakpoints.length-1;

        while(j !== stopBreakpoint) {

          if(this.state.calculationMode === 'percentage') {
            breakpoints[j].image.width = this.calculateImageWidthByPercentage(imageSizes[i].points[0], containerWidth, breakpoints[j+1].width);
          } else if(this.state.calculationMode === 'calculation') {
            breakpoints[j].image.width = this.calculateImageWidthByCalc(breakpoints[j+1].width, imageSizes[i].size);
          }

          breakpoints[j].image.height = this.calculateImageHeightLinear(imageSizes[i].points[0] / imageSizes[i].points[1], breakpoints[j].image.width);

          j++;
        }
        //Check to see if last element in the array.
      } else if (typeof stopPoints[i + 1] === 'undefined' ) {
        let containerWidth = breakpoints[stopPoints[i]+1].width;
        let j = stopPoints[i];
        while (j < breakpoints.length - 1) {

          if(this.state.calculationMode === 'percentage') {
            breakpoints[j].image.width = this.calculateImageWidthByPercentage(imageSizes[i].points[0], containerWidth, breakpoints[j+1].width);
          } else if(this.state.calculationMode === 'calculation') {
            breakpoints[j].image.width = this.calculateImageWidthByCalc(breakpoints[j+1].width, imageSizes[i].size);
          }

          breakpoints[j].image.height = this.calculateImageHeightLinear(imageSizes[i].points[0] / imageSizes[i].points[1], breakpoints[j].image.width);

          j++;
        }
        //if not first or last element handle all common cases.
      } else {
        let containerWidth = breakpoints[stopPoints[i]+1].width;
        let j = stopPoints[i];
        while ( j !== stopPoints[i+1]) {

          if(this.state.calculationMode === 'percentage') {
            breakpoints[j].image.width = this.calculateImageWidthByPercentage(imageSizes[i].points[0], containerWidth, breakpoints[j+1].width);
          } else if(this.state.calculationMode === 'calculation') {
            breakpoints[j].image.width = this.calculateImageWidthByCalc(breakpoints[j+1].width, imageSizes[i].size);
          }

          breakpoints[j].image.height = this.calculateImageHeightLinear(imageSizes[i].points[0] / imageSizes[i].points[1], breakpoints[j].image.width);
          j++;

        }
      }
    }
    //set the breakpoint that where changed to the state.

    this.setState({breakpoints: breakpoints});
  }
  //get the image width two decimal places
  calculateImageWidthByPercentage(imageWidth, containerWidth, newContainerWidth) {
    let sizeInPercent = Math.floor(((imageWidth / containerWidth) * 100));
    return Math.floor(((sizeInPercent * newContainerWidth) / 100));
  }

  calculateImageWidthByCalc(breakpointWidth, size) {
    let size_equation = size.replace('calc', '').replace('px', '').replace(/([\d\.]*)vw/g, "$1/100*" + breakpointWidth).replace(/([\d\.]*)%/g, '$1/100');

    return eval(size_equation);
  }
  //get the height to the lowest whole number.
  calculateImageHeightLinear(aspectRatio, width){
    return Math.floor(width / aspectRatio);
  }

  exportCSV() {
    let breakpoints = this.state.breakpoints;
    let multipliers = this.state.multipliers;

    let csv = [];
    csv.push('data:text/csv;charset=utf-8,' + ['Breakpoint', 'Width', 'Height', 'Multiplier', 'Style'].join(', '));

    for(let i = 1; i < breakpoints.length-1; i++) {
      csv.push([breakpoints[i].name, breakpoints[i].image.width, breakpoints[i].image.height, 1, breakpoints[i].style].join(', '));
      for(let j = 1; j < multipliers.length; j++) {
        csv.push([breakpoints[i].name,
          multipliers[j].value*breakpoints[i].image.width,
          multipliers[j].value*breakpoints[i].image.height,
          multipliers[j].name,
          breakpoints[i].style].join(', '));
      }
    }

    let csvString = encodeURI(csv.join("\n"));

    let link = document.createElement("a");
    link.setAttribute("href", csvString);
    link.setAttribute("download", "breakpoints.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
  }

  uploadImage(file, focalPoint) {
    let data = new FormData();
    data.append('image', file);
    data.append('focalPoint', JSON.stringify(focalPoint));

    let breakpoints = this.state.breakpoints;
    let multipliers = this.state.multipliers;
    let sizes = [];

    for(let i = 1; i < breakpoints.length-1; i++) {
      sizes.push({
        name: breakpoints[i].name,
        width: breakpoints[i].image.width,
        height: breakpoints[i].image.height,
      });

      for(let j = 1; j < multipliers.length; j++) {
        sizes.push({
          name: breakpoints[i].name+'@'+multipliers[j].name,
          width: multipliers[j].value*breakpoints[i].image.width,
          height: multipliers[j].value*breakpoints[i].image.height,
        });
      }
    }

    data.append('sizes', JSON.stringify(sizes));

    fetch('/image-export',{
      method: 'post',
      body: data,
    }).then(response => {
      return response.text();
    }).then((url) => {
      let downloads = this.state.downloads;
      downloads.imageExport = url;

      this.setState({downloads: downloads});
    }).catch(console.log);
  }

  removeDownload(name) {
    let downloads = this.state.downloads;
    downloads[name] = null;

    this.setState({downloads: downloads});
  }

  render() {
    return (
      <article id="main" className="main">
        <div className="row">
          <Settings  breakpoints={this.state.breakpoints}
                     imageSizes={this.state.imageSizes}
                     multipliers={this.state.multipliers}
                     breakpointList={this.state.breakpointList}
                     calculationMode={this.state.calculationMode}
                     downloads={this.state.downloads}
                     callbacks={{
                       breakpointChange: this.onChangeImageSelectBreakpoint.bind(this),
                       calcChange: this.onChangeCalculation.bind(this),
                       modeChange: this.onChangeCalculationMode.bind(this),
                       breakpointUpdate: this.breakpointUpdate.bind(this),
                       imageSizeUpdate: this.imageSizeUpdate.bind(this),
                       multiplierUpdate: this.multiplierUpdate.bind(this),
                       imageStyleShownChange: this.onChangeImageStyleShown.bind(this),
                       exportCSV: this.exportCSV.bind(this),
                       addBreakpoint: this.addBreakpoint.bind(this),
                       deleteBreakpoint: this.deleteBreakpoint.bind(this),
                       addImageSize: this.addImageSize.bind(this),
                       deleteImageSize: this.deleteImageSize.bind(this),
                       addMultiplier: this.addMultiplier.bind(this),
                       deleteMultiplier: this.deleteMultiplier.bind(this),
                       uploadImage: this.uploadImage.bind(this),
                       removeDownload: this.removeDownload.bind(this),
                     }}
          />
          <OutputTable breakpoints={this.state.breakpoints}
                       multipliers={this.state.multipliers}
                       breakpointStyleChange={this.onChangeBreakpointImageStyle.bind(this)}
                       styleOptions={this.props.styleOptions}
                       imageStyleShown={this.state.imageStyleShown}
          />
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