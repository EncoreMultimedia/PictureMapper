import React,{Component} from 'react';
import PropTypes from 'prop-types';
import SystemTable from './SystemTable';
import HelpCenter from '../HelpCenter/HelpCenter';
import ImageExport from './ImageExport';

export default class Settings extends Component{

  constructor(props) {
    super(props);
    this.state = {
      tableValue: this.props.breakpoints,
      settingsPanel: 'breakpoint',
      exportPanel: false,
    };
  }

  onClickTableHandler(value) {
    switch(value) {
      case 'breakpoints': this.setState({tableValue: this.props.breakpoints}); break;
      case 'imageSizes': this.setState({tableValue: this.props.imageSizes}); break;
      case 'multipliers': this.setState({tableValue: this.props.multipliers}); break;
      default: this.setState({tableValue: this.props.breakpoints});
    }

    this.setState({settingsPanel: value});
  }

  onClickExportHandler(value) {
    if(value == 'csv') {
      this.props.callbacks.imageStyleShownChange(true);
    } else {
      this.props.callbacks.imageStyleShownChange(false);
    }

    this.setState({exportPanel: value});
  }

  render() {
    return (
      <section className="settings small-12 medium-6 large-5 columns">
        <HelpCenter/>
        <div className="setting-wrapper">
          <div className="setting-button-wrapper">
            <button className={'btn-setting button' + (this.state.settingsPanel == 'breakpoint' ? ' active' : '')} onClick={() => this.onClickTableHandler('breakpoint')}>Breakpoints</button>
            <button className={'btn-setting button' + (this.state.settingsPanel == 'imageSizes' ? ' active' : '')} onClick={() => this.onClickTableHandler('imageSizes')}>Image Sizes</button>
            <button className={'btn-setting button' + (this.state.settingsPanel == 'multipliers' ? ' active' : '')} onClick={() => this.onClickTableHandler('multipliers')}>Multipliers</button>
          </div>
        </div>
        <section className="setting-systems">
          <SystemTable tableValue={this.state.tableValue} breakpointList={this.props.breakpointList} calculationMode={this.props.calculationMode} callbacks={this.props.callbacks}/>
        </section>
        <section className="setting-export">
          <h3>Export</h3>
          <div className="setting-wrapper">
            <div className="setting-button-wrapper">
              <button className={'btn-setting button' + (this.state.exportPanel == 'csv' ? ' active' : '')} onClick={() => this.onClickExportHandler('csv')}>Drupal CSV</button>
              <button className={'btn-setting button' + (this.state.exportPanel == 'image' ? ' active' : '')} onClick={() => this.onClickExportHandler('image')}>Image Export</button>
              <button className={'btn-setting button' + (this.state.exportPanel == 'markup' ? ' active' : '')} onClick={() => this.onClickExportHandler('markup')}>Markup</button>
            </div>
            {this.state.exportPanel == 'csv' && <div className="setting-wrapper">
              <p>This will export a CSV in a specific format for this Picture_mapper module that can be found <a className="" href="https://www.drupal.org/sandbox/thelostcookie/2742243">here</a>.</p>
              <button className="btn-setting button secondary" onClick={() => this.props.callbacks.exportCSV()}>Export</button>
            </div>}

            {this.state.exportPanel == 'image' && <ImageExport uploadImage={this.props.callbacks.uploadImage} exportDownload={this.props.downloads.imageExport} removeDownload={this.props.callbacks.removeDownload} />}
          </div>



        </section>
      </section>
    );
  }
}

Settings.propTypes = {
  breakpoints: PropTypes.arrayOf(PropTypes.object),
  imageSizes: PropTypes.arrayOf(PropTypes.object),
  multipliers: PropTypes.arrayOf(PropTypes.object),
  breakpointList: PropTypes.array,
  calculationMode: PropTypes.string,
  downloads: PropTypes.object,
  callbacks: PropTypes.objectOf(PropTypes.func),
};