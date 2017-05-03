import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class PercentageBased extends Component {

  render() {
    return (
      <section style={{'display': this.props.activeHelper ? 'block' : 'none'}} id="percentage-based" className="large-12 columns helper" >
        <button onClick={()=>this.props.toggleActiveHelper('percentageBased')} className="close-button" aria-label="Dismiss alert" type="button" data-close>
          <span aria-hidden="true">&times;</span>
        </button>
        <header><h2>Percentage Based</h2></header>
        <article>
          <p>Using this system in percentage based mode takes your image sizes then calculates the percentage of the space they take up from the associated breakpoint.  The application will assign image values to your breakpoints based on the associated breakpoints on image sizes that are inputted.  It is possible to have slight variance in the applications assigned widths. If you desire more accurate results add more image sizes.
          </p>
        </article>
      </section>
    );
  }
}

PercentageBased.propTypes = {
  activeHelper: PropTypes.bool,
  toggleActiveHelper: PropTypes.func,
};