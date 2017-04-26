import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class HelpCenter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="help-center small-12">
        <div className="button-col small-6 medium-6 columns">
          <button className="button">Percentage Based</button>
          <button className="button">Calculation Based</button>
          <button className="button">Report Bug</button>
        </div>
        <div className="powered small-6 medium-6 columns">
          <h2>Powered By:</h2>
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60.7" viewBox="0 0 60 60.7">
            <path d="M60,30.32a30,30,0,1,1-30-30A30,30,0,0,1,60,30.32ZM13.49,39.57a12.21,12.21,0,0,0,7.38,8.07A19,19,0,0,0,28,48.84a31.88,31.88,0,0,0,6.49-.62,30.48,30.48,0,0,0,4.91-1.38l-.76-8a21.64,21.64,0,0,1-4.26,1.13,26.8,26.8,0,0,1-4.46.38q-3.5,0-5.12-1.2A6.09,6.09,0,0,1,22.76,35a51.17,51.17,0,0,0,9.13-.76,23.51,23.51,0,0,0,7.24-2.43,12.91,12.91,0,0,0,4.77-4.36A11.8,11.8,0,0,0,45.62,21a10.32,10.32,0,0,0-.86-4.29,9.08,9.08,0,0,0-2.41-3.19,10.87,10.87,0,0,0-3.6-2,14.1,14.1,0,0,0-4.46-.69,20,20,0,0,0-8.89,2,21.55,21.55,0,0,0-6.83,5.15,23.2,23.2,0,0,0-4.35,7.31,19.49,19.49,0,0,0-.66,2.12c0,.1-3-.59-3-.59l-.84,6.17,2.91.81A26.8,26.8,0,0,0,13.49,39.57ZM36.36,22.2a4.33,4.33,0,0,1-.48,1.93A4.56,4.56,0,0,1,34,25.91a14.83,14.83,0,0,1-4,1.41A38.49,38.49,0,0,1,23,28a12.16,12.16,0,0,1,3.47-6.62,8.64,8.64,0,0,1,6.14-2.51C35.12,18.91,36.36,20,36.36,22.2Z"/>
          </svg>
          <h3>Encore Multimedia</h3>
        </div>
      </section>
    );
  }
}