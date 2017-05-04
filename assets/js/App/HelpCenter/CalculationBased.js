import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class CalculationBased extends Component {

  render() {
    return (
      <section style={{'display': this.props.activeHelper ? 'block' : 'none'}} id="calculation-based" className="large-12 columns helper">
        <button onClick={()=>this.props.toggleActiveHelper('calculationBased')} className="close-button" aria-label="Dismiss alert" type="button" data-close>
          <span aria-hidden="true">&times;</span>
        </button>
        <header><h2>Calculation Based</h2></header>
        <article>
          <p> This system offers you the ability to have an accurate calculation of your image size widths. You can consider other elements that play a factor on your image size, such as, padding, margin and surrounding elements. This is limited to only using math that the css calc() function allows.
          </p>
        </article>
      </section>
    );
  }
}

CalculationBased.propTypes = {
  activeHelper: PropTypes.bool,
  toggleActiveHelper: PropTypes.func,
};