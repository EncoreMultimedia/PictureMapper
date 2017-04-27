import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ReportBug extends Component {

  render() {
    return (
      <section style={{'display': this.props.activeHelper ? 'block' : 'none'}} id="report-bug" className="large-12 columns helper">
        <button onClick={()=>this.props.toggleActiveHelper('reportBug')} className="close-button" aria-label="Dismiss alert" type="button" data-close>
          <span aria-hidden="true">&times;</span>
        </button>
        <header><h2>Report a Bug</h2></header>
        <article>
          <p>Thank you for using our application and leaving feedback on your experience!</p>
          <address>
            <a href="mailto:developers@encoremultimedia.com">Email us!</a>
          </address>
        </article>
      </section>
    );
  }
}

ReportBug.propTypes = {
  activeHelper: PropTypes.bool,
  toggleActiveHelper: PropTypes.func,
};
