import React, {Component} from 'react';
import PropTypes from 'prop-types';
export default class SystemTable extends Component {

  constructor(props) {
    super(props);
  }

  tablefy(tableValues) {
    switch(tableValues[0].header[0]) {
      case 'breakpoints': return this.buildBreakpoints(tableValues);
      case 'imageSizes':  return this.buildImageSizes(tableValues);
      case 'multipliers': return this.buildMultipliers(tableValues);
    }
  }

  onBlurBreakpoint(e, property, id) {
    if(e.target.value.trim() !== '') {
      if(property === 'name' && e.target.value !== e.target.defaultValue) {
        document.getElementById('name-bp-' + id).defaultValue = e.target.value;
        this.props.callbacks.breakpointUpdate(e, property, id);
      }
      if(property === 'width' && e.target.value !== e.target.defaultValue) {
        document.getElementById('width-bp-' + id).defaultValue = e.target.value;
        this.props.callbacks.breakpointUpdate(e, property, id);
      }
    } else {
      document.getElementById('name-bp-' + id).setAttribute('value', e.target.value);
    }
  }

  buildBreakpoints(tableValues) {
    // add the table headings
    const tableHeadings = <tr><th>{tableValues[0].header[1]}</th><th>{tableValues[0].header[2]}</th></tr>;
    // create the table body, if row.data == header then don't return the headings object.
    const tableBody = this.props.tableValue.map((rowData) => {
      return (
        rowData.header ? null : <tr key={rowData.id + 'breakpoint'}>
                                  <td>
                                    <input id={'name-bp-' + rowData.id} type="text" onBlur={(e)=>this.onBlurBreakpoint(e, 'name', rowData.id)}  defaultValue={rowData.name}/>
                                  </td>
                                  <td>
                                    <input id={'width-bp-' + rowData.id} type="number" onBlur={(e)=>this.onBlurBreakpoint(e, 'width', rowData.id)} defaultValue={parseInt(rowData.width, 10)} />
                                  </td>
                                </tr>
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

  onBlurImageSize(e, property, id) {
    if(e.target.value.trim() !== '') {
      if(property === 'width' && e.target.value !== e.target.defaultValue) {
        document.getElementById('width-is-' + id).defaultValue = e.target.value;
        this.props.callbacks.imageSizeUpdate(e, property, id);
      }
      if(property === 'height' && e.target.value !== e.target.defaultValue) {
        document.getElementById('height-is-' + id).defaultValue = e.target.value;
        this.props.callbacks.imageSizeUpdate(e, property, id);
      }
    }
  }

  buildImageSizes(tableValues) {
    // add the table headings
    const tableHeadings = (
      <tr>
        <th width='80' >{tableValues[0].header[2]}</th>
        <th width='80'>{tableValues[0].header[3]}</th>
        <th>Breakpoint</th>
        {this.props.calculationMode === 'calculation' ? <th>Calc</th> : null}
      </tr>
    );
    // create the table body, if row.data == header then don't return the headings object.
    const tableBody = this.props.tableValue.map((rowData) => {
      const list = this.props.breakpointList.map((value) => {
        return <option key={value + 'select-list'} value={value.toLowerCase()}>{value}</option>;
      });
      return (
        rowData.header ? null : <tr key={rowData.id + 'imageSizes'}>
                                  <td><input id={'width-is-' + rowData.id} defaultValue={rowData.points[0]} onBlur={(e)=>this.onBlurImageSize(e, 'width', rowData.id)} /></td>
                                  <td><input id={'height-is-' + rowData.id} defaultValue={rowData.points[1]} onBlur={(e)=>this.onBlurImageSize(e, 'height', rowData.id)} /></td>
                                  <td><select onChange={(e)=>this.onChangeList(e, rowData.id)} value={rowData.breakpoint ? rowData.breakpoint : ''}>{list}</select></td>
                                  {this.props.calculationMode === 'calculation' ? <td><input type="text" onChange={(e)=>this.calcChange(e, rowData.id)} defaultValue={rowData.size} /></td> : null}
                                </tr>
      );
    });
    // return the imageSize table
    return(
      <section>
        <fieldset onChange={(e)=>this.radioChange(e)}>
          <input type="radio" name="image-mode" value={'percentage'} id="percentage" defaultChecked={true} />
          <label htmlFor="percentage">Percentage Based</label>
          <input type="radio" name="image-mode" value={'calculation'} id="calculation" />
          <label htmlFor="calculation">Calculation Based</label>
        </fieldset>
        <table className="stack settings">
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
    this.props.callbacks.modeChange(e.target.value);
  }

  calcChange(e, rowDataID) {
    this.props.callbacks.calcChange(rowDataID, e.target.value);
  }

  onChangeList(e, rowDataID) {
    this.props.callbacks.breakpointChange(rowDataID, e.target.value);
  }

  onChangeMultiplier(e, property, id ) {
    if(e.target.value.trim() !== '') {
      if(property === 'name' && e.target.value !== e.target.defaultValue) {
        this.props.callbacks.multiplierUpdate(e.target.value, property, id);
      }
      if(property === 'value' && e.target.value !== e.target.defaultValue) {
        this.props.callbacks.multiplierUpdate(e.target.value, property, id);
      }
    }
  }

  buildMultipliers(tableValues) {
    // add the table headings
    const tableHeadings = <tr><th>{tableValues[0].header[1]}</th><th>{tableValues[0].header[2]}</th></tr>;
    // create the table body, if row.data == header then don't return the headings object.
    const tableBody = this.props.tableValue.map((rowData) => {
      return (
        rowData.header ? null : <tr key={rowData.id}>
                                  <td><input id={'multi-name-'+rowData.id} onBlur={(e)=>this.onChangeMultiplier(e, 'name', rowData.id)} defaultValue={rowData.name}/></td>
                                  <td><input id={'multi-value-'+rowData.id} onBlur={(e)=>this.onChangeMultiplier(e, 'value', rowData.id)} defaultValue={rowData.value}/></td>
                                </tr>
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
  calculationMode: PropTypes.string,
  callbacks: PropTypes.objectOf(PropTypes.func),
};