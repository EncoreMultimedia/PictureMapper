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

  //sort from least to greatest
  sortImagePoints(points) {
    return points.sort(function(a,b) {
      return a[0] - b[0];
    });
  }

  componentDidUpdate(prevProps, prevState) {

  }

  breakpointUpdate(value, changedElement, breakpoint) {

    let breakpoints = this.state.breakpoints;

    for(let i = 1; i < breakpoints.length; i++) {
      if(changedElement === 'name' && parseInt(breakpoints[i].id) === parseInt(breakpoint)) {
        breakpoints[i].name = value.target.value;
      }
      if(changedElement === 'width' && parseInt(breakpoints[i].id) === parseInt(breakpoint)) {
        breakpoints[i].width = parseInt(value.target.value);
      }
    }

    if(changedElement === 'width') {
      breakpoints = this.sortByWidth(breakpoints);
      this.setState({breakpoints: breakpoints});
      this.setImageSizes();
    } else {
      this.setState({breakpoints: breakpoints, breakpointList: this.createBreakpointList(breakpoints)});
    }
  }

  imageSizeUpdate(value, changedElement, imageSizeId) {
    let imageSizes = this.state.imageSizes;

    for(let i = 1; i < imageSizes.length; i++) {
      if(changedElement === 'width' && imageSizes[i].id === imageSizeId) {
        imageSizes[i].points[0] = parseInt(value.target.value);
      }

      if(changedElement === 'height' && imageSizes[i].id === imageSizeId) {
        imageSizes[i].points[1] = parseInt(value.target.value);
      }
    }

    if(changedElement === 'width') {
      imageSizes = this.sortByImageWidth(imageSizes);
    }

    this.setState({imageSizes: imageSizes});
    this.setImageSizes();

  }

  multiplierUpdate(value, changedInput, id) {
    console.log(changedInput);
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
    this.setImageSizes();
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

  reIdObjects() {
    let arr = this.state.breakpoints;
    console.log(arr);
    for(let i = 0; i < arr.length; i++) {
      if(!arr[i].header) {
        arr[i].id = parseInt(i - 1);
        console.log(arr[i]);
      }
    }
    this.setState({breakpoints: arr});
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


  onChangeBreakpointImageStyle(id, value) {
    let breakpoints = this.state.breakpoints;
    for(let i = 1; i < breakpoints.length; i++) {
      if(breakpoints[i].id === id) {
        breakpoints[i].style = value;
      }
    }
    this.setState({breakpoints: breakpoints});
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
        let containerWidth = breakpoints[stopPoint[i]+1].width;
        let j = 0;
        while(j !== stopPoint[i + 1]) {

          if(this.state.calculationMode === 'percentage') {
            breakpoints[j+1].image.width = this.calculateImageWidthByPercentage(imageSize[i + 1].points[0], containerWidth, breakpoints[j+1].width);
          } else if(this.state.calculationMode === 'calculation') {
            breakpoints[j+1].image.width = this.calculateImageWidthByCalc(breakpoints[j+1].width, imageSize[i+1].size);
          }

          breakpoints[j+1].image.height = this.calculateImageHeightLinear(imageSize[i + 1].points[0] / imageSize[i + 1].points[1], breakpoints[j+1].image.width);

          j++;
        }
        //Check to see if last element in the array.
      } else if (typeof stopPoint[i + 1] === 'undefined' ) {
        let containerWidth = breakpoints[stopPoint[i]+1].width;
        let j = stopPoint[i];
        while (j < breakpoints.length - 1) {

          if(this.state.calculationMode === 'percentage') {
            breakpoints[j+1].image.width = this.calculateImageWidthByPercentage(imageSize[i + 1].points[0], containerWidth, breakpoints[j+1].width);
          } else if(this.state.calculationMode === 'calculation') {
            breakpoints[j+1].image.width = this.calculateImageWidthByCalc(breakpoints[j+1].width, imageSize[i+1].size);
          }

          breakpoints[j+1].image.height = this.calculateImageHeightLinear(imageSize[i + 1].points[0] / imageSize[i + 1].points[1], breakpoints[j+1].image.width);

          j++;
        }
        //if not first or last element handle all common cases.
      } else {
        let containerWidth = breakpoints[stopPoint[i]+1].width;
        let j = stopPoint[i];
        while ( j !== stopPoint[i + 1]) {

          if(this.state.calculationMode === 'percentage') {
            breakpoints[j+1].image.width = this.calculateImageWidthByPercentage(imageSize[i + 1].points[0], containerWidth, breakpoints[j+1].width);
          } else if(this.state.calculationMode === 'calculation') {
            breakpoints[j+1].image.width = this.calculateImageWidthByCalc(breakpoints[j+1].width, imageSize[i+1].size);
          }

          breakpoints[j+1].image.height = this.calculateImageHeightLinear(imageSize[i + 1].points[0] / imageSize[i + 1].points[1], breakpoints[j+1].image.width);

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

    for(let i = 1; i < breakpoints.length; i++) {
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

    for(let i = 1; i < breakpoints.length; i++) {
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