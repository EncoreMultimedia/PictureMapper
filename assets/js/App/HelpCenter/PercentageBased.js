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
          <p>Lorem ipsum dolor sit amet, mel te civibus fierent temporibus, oratio voluptaria ei sed. Omnesque repudiare deseruisse nam ex, erant minimum vel et. Ex summo choro interesset pri, an liber volutpat necessitatibus eos. No qui error tritani. Vel autem inani decore ea, fuisset qualisque dissentiunt te his.</p>
        </article>
      </section>
    );
  }
}

PercentageBased.propTypes = {
  activeHelper: PropTypes.bool,
  toggleActiveHelper: PropTypes.func,
};