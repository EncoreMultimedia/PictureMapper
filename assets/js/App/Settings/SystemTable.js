import React, {Component} from 'react';
import PropTypes from 'prop-types';
export default class SystemTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      radioImageValue: false,
    };
  }

  tablefy(tableValues) {
    switch(tableValues[0].header[0]) {
    case 'breakpoints': return this.buildBreakpoints(tableValues);
    case 'imageSizes':  return this.buildImageSizes(tableValues);
    case 'multipliers': return this.buildMultipliers(tableValues);
    }
  }

  buildBreakpoints(tableValues) {
    // add the table headings
    const tableHeadings = <tr><th>{tableValues[0].header[1]}</th><th>{tableValues[0].header[2]}</th></tr>;
    // create the table body, if row.data == header then don't return the headings object.
    const tableBody = this.props.tableValue.map((rowData) => {
      return (
        rowData.header ? null : <tr key={rowData.id}><td>{rowData.name}</td><td>{rowData.width}</td></tr>
      );
    });
    // return the breakpoint table
    return(
      <table className="stack">
        <thead>
          {tableHeadings}
        </thead>
        <tbody>
          {tableBody}
        </tbody>
      </table>
    );
  }

  buildImageSizes(tableValues) {
    // add the table headings
    const tableHeadings = (
      <tr>
        <th>{tableValues[0].header[1]}</th>
        <th>{tableValues[0].header[2]}</th>
        <th>{tableValues[0].header[3]}</th>
        <th>Breakpoint</th>
        {this.state.radioImageValue ? <th>Calc</th> : null}
      </tr>
    );
    // create the table body, if row.data == header then don't return the headings object.
    const tableBody = this.props.tableValue.map((rowData) => {
      const list = this.props.breakpointList.map((value) => {
        return <option key={value} value={value.toLowerCase()}>{value}</option>;
      });
      return (
        rowData.header ? null : <tr key={rowData.id}>
                                  <td>{rowData.id}</td>
                                  <td>{rowData.points[0]}</td>
                                  <td>{rowData.points[1]}</td>
                                  <td><select onChange={(e)=>this.onChangeList(e, rowData.id)} value={rowData.breakpoint ? rowData.breakpoint : ''}>{list}</select></td>
                                  {this.state.radioImageValue ? <td><input type="text"/></td> : null}
                                </tr>
      );
    });
    // return the imageSize table
    return(
      <section>
        <fieldset onChange={(e)=>this.radioChange(e)}>
          <input type="radio" name="image-mode" value={false} id="percentage" defaultChecked={true} />
          <label htmlFor="percentage">Percentage Based</label>
          <input type="radio" name="image-mode" value={true} id="calculation" />
          <label htmlFor="calculation">Calculation Based</label>
        </fieldset>
        <table className="stack">
          <thead>
          {tableHeadings}
          </thead>
          <tbody>
          {tableBody}
          </tbody>
        </table>
      </section>

    );
  }

  radioChange(e) {

    this.setState({
      radioImageValue: JSON.parse(e.target.value),
    });
  }

  onChangeList(e, rowDataID) {
    this.props.callbacks(rowDataID, e.target.value);
  }

  buildMultipliers(tableValues) {
    // add the table headings
    const tableHeadings = <tr><th>{tableValues[0].header[1]}</th><th>{tableValues[0].header[2]}</th></tr>;
    // create the table body, if row.data == header then don't return the headings object.
    const tableBody = this.props.tableValue.map((rowData) => {
      return (
        rowData.header ? null : <tr key={rowData.id}><td>{rowData.name}</td><td>{rowData.value}</td></tr>
      );
    });
    // return the Image Size table
    return(
      <table className="stack">
        <thead>
          {tableHeadings}
        </thead>
        <tbody>
          {tableBody}
        </tbody>
      </table>
    );
  }

  render() {
    let table = this.tablefy(this.props.tableValue);
    return (
      <div className="system-table">
        {table}
      </div>
    );
  }
}

SystemTable.propTypes = {
  tableValue: PropTypes.arrayOf(PropTypes.object),
  breakpointList: PropTypes.array,
  callbacks: PropTypes.func,
};