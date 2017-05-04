import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Settings from './Settings/Settings';
import OutputTable from './OutputTable/OutputTable';
import BreakpointHandler from './Handlers/BreakpointHandler';
import MultipliersHandler from './Handlers/MultipliersHandler';
import ImageSizeHandler from './Handlers/ImageSizeHandler';

export default class App extends Component {
  /**
   *
   * @param props
   */
  constructor(props) {
    super(props);
    this.breakpointsHandler =  new BreakpointHandler(this.props.breakpoints);
    this.multiplierHandler = new MultipliersHandler(this.props.multipliers);
    this.imageSizeHandler = new ImageSizeHandler(this.props.imageSizes);

    // Set Image Sizes
    this.breakpointsHandler.setImageSizes(this.props.imageSizes, 'percentage');

    this.state = {
      breakpoints: this.breakpointsHandler.breakpoints,
      imageSizes: this.props.imageSizes,
      multipliers: this.props.multipliers,
      breakpointList: this.createBreakpointList(this.props.breakpoints),
      calculationMode: 'percentage',
      imageStyleShown: false,
      downloads: {
        imageExport: null,
      },
    };

    console.log('%c    Presented By: EncoreMultimedia.com   ', 'background: #fff; color: #0278ff  ');
  }

  /**
   *
   * @param property
   * @param index
   * @param value
   */
  //updates the breakpoint using the breakpoint handler class
  breakpointUpdate(property, index, value) {
    if(property === 'name') {
      this.setState({
        breakpoints: this.breakpointsHandler.updateName(index, value).breakpoints,
        breakpointList: this.createBreakpointList(this.breakpointsHandler.breakpoints),
      });
    }
    if(property === 'width') {
      this.setState((prevState) => {
        return {breakpoints: this.breakpointsHandler.updateWidth(index, value).setImageSizes(prevState.imageSizes, prevState.calculationMode).breakpoints};
      });
    }
  }

  /**
   *
   * @param name
   * @param width
   */
  //add a breakpoint using the breakpoint handler class
  addBreakpoint(name, width) {
    this.setState((prevState) => {
      return {
        breakpoints: this.breakpointsHandler.addBreakpoint(name, width).setImageSizes(prevState.imageSizes, prevState.calculationMode).breakpoints,
        breakpointList: this.createBreakpointList(this.breakpointsHandler.breakpoints),
      };
    });
  }

  /**
   *
   * @param index
   */
  //delete a breakpoint using the breakpoint handler class
  deleteBreakpoint(index) {
    this.setState((prevState) => {
      let imageSizes = prevState.imageSizes;

      let lowerName =  this.breakpointsHandler.getBreakpoint(index).name.toLowerCase();
      let newLastLowerName;

      if(typeof  this.breakpointsHandler.breakpoints[index + 1] === 'undefined') {
        newLastLowerName = this.breakpointsHandler.getBreakpoint(index - 1).name.toLowerCase();
      }

      // Change image styles to default if they are using this breakpoint or
      // the previous breakpoint if we're deleting the last in the list
      for(let image in imageSizes) {
        if(imageSizes[image].breakpoint === lowerName || imageSizes[image].breakpoint === newLastLowerName) {
          imageSizes[image].breakpoint = 'default';
        }
      }

      return {
        breakpoints: this.breakpointsHandler.deleteBreakpoint(index).setImageSizes(imageSizes, prevState.calculationMode).breakpoints,
        breakpointList: this.createBreakpointList(this.breakpointsHandler.breakpoints),
        imageSizes: imageSizes,
      };
    });
  }

  /**
   *
   * @param index
   * @param value
   */
  onChangeBreakpointImageStyle(index, value) {
    this.setState({breakpoints: this.breakpointsHandler.updateStyleOption(index, value).breakpoints});

  }

  /**
   *
   * @param property
   * @param index
   * @param value
   */
  imageSizeUpdate(property, index, value) {

    if(property === 'width') {
      this.setState((prevState) => {
        return{
          imageSizes: this.imageSizeHandler.updateWidth(index, value).imageSizes,
          breakpoints: this.breakpointsHandler.setImageSizes(prevState.imageSizes, prevState.calculationMode).breakpoints};
      });
    }

    if(property === 'height') {
      this.setState((prevState) => {
        return{
          imageSizes: this.imageSizeHandler.updateHeight(index, value).imageSizes,
          breakpoints: this.breakpointsHandler.setImageSizes(prevState.imageSizes, prevState.calculationMode).breakpoints};
      });
    }
  }

  /**
   *
   * @param width
   * @param height
   */
  addImageSize(width, height) {
    this.setState((prevState) => {
      return {
        imageSizes: this.imageSizeHandler.addImageSize(width, height, prevState.breakpointList).imageSizes,
        breakpoints: this.breakpointsHandler.setImageSizes(this.imageSizeHandler.imageSizes, prevState.calculationMode).breakpoints,
      };
    });
  }

  /**
   *
   * @param index
   */
  deleteImageSize(index) {
    this.setState((prevState) => {
      return {
        imageSizes: this.imageSizeHandler.deleteImageSize(index).imageSizes,
        breakpoints: this.breakpointsHandler.setImageSizes(this.imageSizeHandler.imageSizes, prevState.calculationMode).breakpoints,
      };
    });
  }

  /**
   *
   * @param property
   * @param index
   * @param value
   */
  multiplierUpdate(property,index, value) {

    if(property === 'name') {
      this.setState((prevState) => {
        return {multipliers: this.multiplierHandler.updateResolution(index, value).multipliers};
      });
    }
    if(property === 'value') {
      this.setState((prevState) => {
        return{
          multipliers: this.multiplierHandler.updateMultiplier(index, value).multipliers,
          breakpoints: this.breakpointsHandler.setImageSizes(prevState.imageSizes, prevState.calculationMode).breakpoints};
      });
    }
  }

  /**
   *
   * @param resolution
   * @param multiplier
   */
  addMultiplier(resolution, multiplier) {
    this.setState({multipliers: this.multiplierHandler.addMultiplier(resolution, multiplier).multipliers});
  }

  /**
   *
   * @param index
   */
  deleteMultiplier(index) {
    this.setState({multipliers: this.multiplierHandler.deleteMultiplier(index).multipliers});
  }

  /**
   *
   * @param breakpoints
   * @returns {Array}
   */
  createBreakpointList(breakpoints) {
    let breakpointList = [];
    //Push breakpoint name onto breakpointList
    for(let i = 0; i < breakpoints.length; i++) {
      breakpointList.push(breakpoints[i].name);
    }
    return breakpointList;
  }

  /**
   *
   * @param mode
   */
  onChangeCalculationMode(mode) {
    this.setState((prevState) => {
      return {
        calculationMode: mode.toString(),
        breakpoints: this.breakpointsHandler.setImageSizes(prevState.imageSizes, mode.toString()).breakpoints,
      };
    });
  }

  /**
   *
   * @param id
   * @param value
   */
  onChangeImageSelectBreakpoint (index, value) {
    this.setState((prevState) => {
      let imageSizes = this.imageSizeHandler.updateBreakpoint(index, value, prevState.breakpointList).imageSizes;

      return {
        imageSizes: imageSizes,
        breakpoints: this.breakpointsHandler.setImageSizes(imageSizes, prevState.calculationMode).breakpoints,
      };
    });
  }

  /**
   *
   * @param id
   * @param value
   */
  onChangeCalculation(id, value) {
    this.setState((prevState) => {
      let imageSizes = prevState.imageSizes;
      imageSizes[id].size = value.toString();

      return {
        imageSizes: imageSizes,
        breakpoints: this.breakpointsHandler.setImageSizes(imageSizes, prevState.calculationMode).breakpoints,
      };
    });
  }

  /**
   *
   * @param value
   */
  onChangeImageStyleShown(value) {
    this.setState({imageStyleShown: value});
  }

  /**
   *
   */
  exportCSV() {
    let breakpoints = this.state.breakpoints;
    let multipliers = this.state.multipliers;

    let csv = [];
    csv.push('data:text/csv;charset=utf-8,' + ['Breakpoint', 'Width', 'Height', 'Multiplier', 'Style'].join(', '));

    for(let i = 0; i < breakpoints.length-1; i++) {
      csv.push([breakpoints[i].name, breakpoints[i].image.width, breakpoints[i].image.height, 1, breakpoints[i].style].join(', '));
      for(let j = 0; j < multipliers.length; j++) {
        csv.push([breakpoints[i].name,
          multipliers[j].value*breakpoints[i].image.width,
          multipliers[j].value*breakpoints[i].image.height,
          multipliers[j].name,
          breakpoints[i].style].join(', '));
      }
    }

    let csvString = encodeURI(csv.join('\n'));

    let link = document.createElement('a');
    link.setAttribute('href', csvString);
    link.setAttribute('download', 'breakpoints.csv');
    document.body.appendChild(link); // Required for FF

    link.click();
  }

  /**
   *
   * @param file
   * @param focalPoint
   */
  uploadImage(file, focalPoint) {
    let data = new FormData();
    data.append('image', file);
    data.append('focalPoint', JSON.stringify(focalPoint));

    let breakpoints = this.state.breakpoints;
    let multipliers = this.state.multipliers;
    let sizes = [];

    for(let i = 0; i < breakpoints.length-1; i++) {
      sizes.push({
        name: breakpoints[i].name,
        width: breakpoints[i].image.width,
        height: breakpoints[i].image.height,
      });

      for(let j = 0; j < multipliers.length; j++) {
        sizes.push({
          name: breakpoints[i].name+'@'+multipliers[j].value,
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

  /**
   *
   * @returns {XML}
   */
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
/**
 *
 * @type {{breakpoints: *, imageSizes: *, multipliers: *}}
 */
App.propTypes = {
  breakpoints: PropTypes.arrayOf(PropTypes.object),
  imageSizes: PropTypes.arrayOf(PropTypes.object),
  multipliers: PropTypes.arrayOf(PropTypes.object),
};