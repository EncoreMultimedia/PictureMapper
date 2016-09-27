/**
 * Created by jfortune on 9/11/16.
 */
import React,{Component, PropTypes} from 'react';

class ExportCSV extends Component {

  fireDownload() {
    let breakpoints = this.props.breakpoints;

    let csv = [];
    csv.push('data:text/csv;charset=utf-8,' + ['Breakpoint', 'Width', 'Height', 'Multiplier', 'Style'].join(', '));

    breakpoints.forEach(function(breakpoint) {
      csv.push([breakpoint.name, breakpoint.width, breakpoint.height, 1, breakpoint.style].join(', '));
      breakpoint.multipliers.forEach(function(multiplier) {
        csv.push([breakpoint.name, multiplier.width, multiplier.height, multiplier.name, breakpoint.style].join(', '));
      });
    });

    let csvString = encodeURI(csv.join("\n"));

    let link = document.createElement("a");
    link.setAttribute("href", csvString);
    link.setAttribute("download", "breakpoints.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
  }

  render() {
    return (
      <div className="export-wrapper">
        <h3>CSV Export</h3>
        <button onClick={this.fireDownload.bind(this)}>Export</button>
      </div>
    );
  }
}

ExportCSV.propTypes = {
  breakpoints: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ExportCSV;
