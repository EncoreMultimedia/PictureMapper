import React, {Component} from 'react';
import PropTypes from 'prop-types';


export default class OutputTable extends Component{
  render() {
    const breakpoints = this.props.breakpoints.map((breakpoint)=>{
      const multipliers = this.props.multipliers.map((multiplier)=>{
        return (
          multiplier.value?
            <tr key={multiplier.id}>
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
          <tr>
            <td><b>{breakpoint.name}</b></td>
            <td>{breakpoint.image ? breakpoint.image.width : null}</td>
            <td>{breakpoint.image ? breakpoint.image.height : null}</td>
            <td>{breakpoint.image ? Math.round(Math.floor(breakpoint.image.width) / Math.floor(breakpoint.image.height) * 100) / 100 : null }</td>
          </tr>
          {multipliers}
        </tbody>
      );
    });

    return (
      <section className="small-12 medium-6 large-8 columns">
        <table>
          <caption>Breakpoint Output</caption>
          <thead>
            <tr>
              <th>Breakpoint Name</th>
              <th>Image Width</th>
              <th>Image Height</th>
              <th>Aspect Ratio</th>
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

};