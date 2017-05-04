import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';

export default class SystemTable extends Component {

  constructor(props) {
    super(props);
  }

  tablefy(tableValues) {
    switch(this.props.tableType) {
      case 'breakpoints': return this.buildBreakpoints(tableValues);
      case 'imageSizes':  return this.buildImageSizes(tableValues);
      case 'multipliers': return this.buildMultipliers(tableValues);
    }
  }

  onBlurBreakpoint(property, index, e) {
    if(e.target.value.trim() !== '') {
      if(property === 'name' && e.target.value !== e.target.defaultValue) {
        document.getElementById('name-bp-' + index).defaultValue = e.target.value;
        this.props.callbacks.breakpointUpdate(property, index, e.target.value);
      }
      if(property === 'width' && e.target.value !== e.target.defaultValue) {
        document.getElementById('width-bp-' + index).defaultValue = e.target.value;
        this.props.callbacks.breakpointUpdate(property, index, e.target.value);
      }
    } else {
      document.getElementById('name-bp-' + index).setAttribute('value', e.target.value);
    }
  }

  addBreakpoint() {
    //get name and width value
    let name = document.getElementById('add-bp-name').value;
    let width = document.getElementById('add-bp-width').value;
    //check if name is blank and width is greater than 0
    if(name.trim() !== '' &&  width > 0 ) {
      this.props.callbacks.addBreakpoint(name, width);
    }
    //reset fields to nothing
    document.getElementById('add-bp-name').value = '';
    document.getElementById('add-bp-width').value = '';
  }

  buildBreakpoints(tableValues) {
    // add the table headings
    const tableHeadings = <tr><th>Name</th><th>Width</th></tr>;
    // create the table body, if row.data == header then don't return the headings object.

    const tableBody = this.props.tableValue.map((rowData, index) => {
      const disabled = rowData.id == 0 ? true : false;
      const removeDisabled = disabled || this.props.tableValue.length <= 2 ? true : false;
      return (
        rowData.header ? null : <tr key={rowData.id + 'breakpoint'}>
                                  <td>
                                    <input id={'name-bp-' + index} type="text" onBlur={(e)=>this.onBlurBreakpoint( 'name',index, e)}  defaultValue={rowData.name} disabled={disabled}/>
                                  </td>
                                  <td>
                                    <input id={'width-bp-' + index} type="number" onBlur={(e)=>this.onBlurBreakpoint('width', index, e)} defaultValue={parseInt(rowData.width, 10)} disabled={disabled} />
                                  </td>
                                  <td><button onClick={()=>this.props.callbacks.deleteBreakpoint(index)} className="button alert tooltip" disabled={removeDisabled}>x<span className="tooltiptext">Delete {rowData.name} Breakpoint</span></button></td>
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
          <tr>
            <td><input id="add-bp-name" type="text" /></td>
            <td><input type="number" id="add-bp-width" /></td>
            <td><button onClick={()=>this.addBreakpoint()} className="button success tooltip">+<span className="tooltiptext">Add Breakpoint</span></button></td>
          </tr>
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
        <th width={this.props.calculationMode === 'calculation' ? '100' : '120'} >Width</th>
        <th width={this.props.calculationMode === 'calculation' ? '100' : '120'}>Height</th>
        <th width={this.props.calculationMode === 'calculation' ? '' : '200'}>Breakpoint</th>
        {this.props.calculationMode === 'calculation' ? <th>Calc</th> : null}
      </tr>
    );

    let breakpointList = cloneDeep(this.props.breakpointList);
    breakpointList.splice(-1, 1);

    // create the table body, if row.data == header then don't return the headings object.
    const tableBody = this.props.tableValue.map((rowData) => {
      const list = breakpointList.map((value) => {
        return <option key={value + 'select-list'} value={value.toLowerCase()}>{value}</option>;
      });
      return (
        rowData.header ? null : <tr key={rowData.id + 'imageSizes'}>
                                  <td><input id={'width-is-' + rowData.id} type="number" defaultValue={rowData.points[0]} onBlur={(e)=>this.onBlurImageSize(e, 'width', rowData.id)} /></td>
                                  <td><input id={'height-is-' + rowData.id} type="number" defaultValue={rowData.points[1]} onBlur={(e)=>this.onBlurImageSize(e, 'height', rowData.id)} /></td>
                                  <td><select onChange={(e)=>this.onChangeList(e, rowData.id)} value={rowData.breakpoint ? rowData.breakpoint : ''}>{list}</select></td>
                                  {this.props.calculationMode === 'calculation' ? <td><input type="text" onChange={(e)=>this.calcChange(e, rowData.id)} defaultValue={rowData.size} /></td> : null}
                                  <td><button onClick={()=>this.props.callbacks.deleteImageSize(rowData.id)} className="button alert tooltip">x<span className="tooltiptext">Delete {rowData.points[0]} width Image Size</span></button></td>
                                </tr>
      );
    });
    // return the imageSize table
    return(
      <section>
        <fieldset onChange={(e)=>this.radioChange(e)}>
          <input type="radio" name="image-mode" value={'percentage'} id="percentage" defaultChecked={this.props.calculationMode !== 'calculation'} />
          <label htmlFor="percentage">Percentage Based</label>
          <input type="radio" name="image-mode" value={'calculation'} id="calculation" defaultChecked={this.props.calculationMode === 'calculation'} />
          <label htmlFor="calculation">Calculation Based</label>
        </fieldset>
        <table className="stack settings">
          <thead>
          {tableHeadings}
          </thead>
          <tbody>
          {tableBody}
          <tr>
            <td><input id="add-is-width" type="number" defaultValue={''}/></td>
            <td><input id="add-is-height" type="number" defaultValue={''}/></td>
            <td width={'20'}><button onClick={()=>this.addImageSize()} className="button success tooltip">+<span className="tooltiptext">Add Image Size</span></button></td>
          </tr>
          </tbody>
        </table>
      </section>
    );
  }

  addImageSize() {
    //get name and width value
    let width = document.getElementById('add-is-width').value;
    let height = document.getElementById('add-is-height').value;
    //check if name is blank and width is greater than 0
    if(height > 0 &&  width > 0 ) {
      this.props.callbacks.addImageSize(width, height);
    }
    //reset fields to nothing
    document.getElementById('add-is-width').value = '';
    document.getElementById('add-is-height').value = '';
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
    const tableHeadings = <tr><th>Resolution</th><th>Multiplier</th></tr>;
    // create the table body, if row.data == header then don't return the headings object.
    const tableBody = this.props.tableValue.map((rowData) => {
      return (
        rowData.header ? null : <tr key={rowData.id}>
                                  <td><input id={'multi-name-'+rowData.id} type="text" onBlur={(e)=>this.onChangeMultiplier(e, 'name', rowData.id)} defaultValue={rowData.name}/></td>
                                  <td><input id={'multi-value-'+rowData.id} type="number" onBlur={(e)=>this.onChangeMultiplier(e, 'value', rowData.id)} defaultValue={rowData.value}/></td>
                                  <td><button onClick={()=>this.props.callbacks.deleteMultiplier(rowData.id)} className="button alert tooltip">x<span className="tooltiptext">Delete {rowData.name} Multiplier</span></button></td>
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
          <tr>
            <td><input id="add-mp-name" type="text"  defaultValue={''}/></td>
            <td><input id="add-mp-value" type="number" defaultValue={''}/></td>
            <td><button onClick={()=>this.addMultiplier()} className="button success tooltip">+<span className="tooltiptext">Add Multiplier</span></button></td>
          </tr>
        </tbody>
      </table>
    );
  }

  addMultiplier() {
    //get name and width value
    let name = document.getElementById('add-mp-name').value;
    let value = document.getElementById('add-mp-value').value;
    //check if name is blank and width is greater than 0
    if(name.trim() !== '' &&  value > 0 ) {
      this.props.callbacks.addMultiplier(name, value);
    }
    //reset fields to nothing
    document.getElementById('add-mp-name').value = '';
    document.getElementById('add-mp-value').value = '';
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
  tableType: PropTypes.string,
  breakpointList: PropTypes.array,
  calculationMode: PropTypes.string,
  callbacks: PropTypes.objectOf(PropTypes.func),
};