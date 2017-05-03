import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

export default class ImageExport extends Component{

  constructor(props) {
    super(props);
    this.state = {
      acceptedFile: null,
      focalPoint: null,
      processing: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.exportDownload != this.props.exportDownload) {
      this.setState({processing: false});
    }
  }

  onDrop(acceptedFiles) {
    if(acceptedFiles.length > 0) {
      this.setState({acceptedFile: acceptedFiles[0]});
    }
  }

  setFocalPoint(e) {
    let imageBox = e.target.getBoundingClientRect();
    let x = e.clientX - imageBox.left;
    let y = e.clientY - imageBox.top;

    let percentX = x / imageBox.width * 100;
    let percentY = y / imageBox.height * 100;

    let focalPoint = {
      x: percentX,
      y: percentY,
    };

    this.setState({
      focalPoint: focalPoint,
    });
  }

  upload() {
    this.props.uploadImage(this.state.acceptedFile, this.state.focalPoint);
    this.setState({processing: true});
  }

  render() {
    let dropContent = <p>Drop image to pick a focal point and upload.</p>;

    let style={
      width: '100%',
      minHeight: '100px',
      padding: '20px',
      borderWidth: '2px',
      borderColor: 'rgb(102, 102, 102)',
      borderStyle: 'dashed',
      borderRadius: '5px',
      overflow: 'hidden',
    };

    if(this.state.acceptedFile != null) {
      dropContent = <img src={this.state.acceptedFile.preview} onClick={(e)=>this.setFocalPoint(e)} />;
      style.padding = 0;
    }

    let submitButton = <p>Please click the image to set a focal point</p>;

    if(this.state.focalPoint != null) {
      submitButton = <button className="button secondary" onClick={()=>this.upload()}>Upload</button>;
    }

    let exportDownload = null;

    if(this.props.exportDownload != null) {
      exportDownload = <a href={this.props.exportDownload} onClick={()=>this.props.removeDownload('imageExport')} target="_blank">Download</a>;
    }

    return (
      <div className="setting-wrapper">
        <h4>Upload Image</h4>
        <Dropzone className="drop-zone" style={style} accept="image/jpeg, image/png" multiple={false} disableClick={true} onDrop={this.onDrop.bind(this)}>
          {dropContent}

          {this.state.focalPoint &&
            <div className="focal-point" style={{
              left: this.state.focalPoint.x + '%',
              top: this.state.focalPoint.y + '%',
            }}>
          </div>}
        </Dropzone>

        {this.state.acceptedFile != null && submitButton}
        {this.state.processing && <p>Processing</p>}
        {!this.state.processing && exportDownload}
      </div>
    );
  }
}

ImageExport.propTypes = {
  uploadImage: PropTypes.func,
  exportDownload: PropTypes.string,
};