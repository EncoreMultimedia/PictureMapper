import React,{Component} from 'react';
import PropTypes from 'prop-types';
import SystemTable from './SystemTable';
import HelpCenter from '../HelpCenter/HelpCenter';

export default class Settings extends Component{

  constructor(props) {
    super(props);
    this.state = {
      tableValue: this.props.breakpoints,
    };
  }

  onClickTableHandler(value) {
    switch(value) {
    case 'breakpoints': this.setState({tableValue: this.props.breakpoints}); break;
    case 'imageSizes': this.setState({tableValue: this.props.imageSizes}); break;
    case 'multipliers': this.setState({tableValue: this.props.multipliers}); break;
    default: this.setState({tableValue: this.props.breakpoints});
    }
  }

  render() {
    return (
      <section className="settings small-12 medium-6 large-4 columns">
        <HelpCenter/>
        <div className="setting-wrapper">
          <div className="setting-button-wrapper">
            <button className="btn-setting button" onClick={() => this.onClickTableHandler('breakpoint')}>Breakpoints</button>
            <button className="btn-setting button" onClick={() => this.onClickTableHandler('imageSizes')}>Image Sizes</button>
            <button className="btn-setting button" onClick={() => this.onClickTableHandler('multipliers')}>Multipliers</button>
          </div>
        </div>
        <section className="setting-systems">
          <SystemTable tableValue={this.state.tableValue} breakpointList={this.props.breakpointList} callbacks={this.props.callbacks}/>
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
  callbacks: PropTypes.func,
};