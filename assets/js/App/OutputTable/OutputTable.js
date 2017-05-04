import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';


export default class OutputTable extends Component{
  render() {

    const styleOptions = this.props.styleOptions.map((style)=>{
      return (
        <option key={style.value} value={style.value}>{style.name}</option>
      );
    });

    let breakpointList = cloneDeep(this.props.breakpoints);
    breakpointList.splice(-1, 1);


    const breakpoints = breakpointList.map((breakpoint, index)=>{
      const multipliers = this.props.multipliers.map((multiplier)=>{
        return (
          multiplier.value?
            <tr key={multiplier.id} className="multiplier">
              <td>&nbsp;&nbsp;&nbsp;&nbsp;Multiplier - {multiplier.value}</td>
              <td>{breakpoint.image ? Math.floor(breakpoint.image.width * multiplier.value) : null}</td>
              <td>{breakpoint.image ? Math.floor(breakpoint.image.height * multiplier.value) : null}</td>
              <td>{breakpoint.image ? Math.round(Math.floor(breakpoint.image.width * multiplier.value) / Math.floor(breakpoint.image.height * multiplier.value) * 100) / 100 : null}</td>
            </tr>
            :null
        );
      });

      return (
        breakpoint.header ? null :
        <tbody key={breakpoint.id}>
          <tr className="image">
            <td><b>{breakpoint.name}</b></td>
            <td>{breakpoint.image ? breakpoint.image.width : null}</td>
            <td>{breakpoint.image ? breakpoint.image.height : null}</td>
            <td>{breakpoint.image ? Math.round(Math.floor(breakpoint.image.width) / Math.floor(breakpoint.image.height) * 100) / 100 : null }</td>
            { this.props.imageStyleShown &&
            <td rowSpan={multipliers.length}>
              <select onChange={(e)=>this.props.breakpointStyleChange(index, e.target.value)} defaultValue={breakpoint.style}>{styleOptions}</select>
            </td>}
          </tr>
          {multipliers}
        </tbody>
      );
    });

    return (
      <section className="small-12 medium-6 large-7 columns">
        <table>
          <caption>Breakpoint Output</caption>
          <thead>
            <tr>
              <th>Breakpoint Name</th>
              <th>Image Width</th>
              <th>Image Height</th>
              <th>Aspect Ratio</th>
              { this.props.imageStyleShown && <th>Image Style</th>}
            </tr>
          </thead>

            {breakpoints}

        </table>
      </section>
    );
  }
}

OutputTable.propTypes = {
  breakpoints: PropTypes.arrayOf(PropTypes.object),
  multipliers: PropTypes.arrayOf(PropTypes.object),
  styleOptions: PropTypes.arrayOf(PropTypes.object),
  breakpointStyleChange: PropTypes.func,
  imageStyleShown: PropTypes.bool,
};