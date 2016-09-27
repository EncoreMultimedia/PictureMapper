/**
 * Created by jfortune on 9/11/16.
 */
import React,{Component, PropTypes} from 'react';

class Multipliers extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      multipliers : this.props.multipliers,
    }

  }

  updateName(id, name) {
    this.props.multipliers[id].name = name;
    this.setState(this.props);
  }

  updateValue(id, value) {
    this.props.multipliers[id].value = parseFloat(value);
    this.setState(this.props);
  }


  render() {
    let multipliers = this.props.multipliers.map((multiplier) => {
      return <Multiplier key={multiplier.id}
                         id={multiplier.id}
                          name={multiplier.name}
                          value={parseFloat(multiplier.value)}
                          callBacks={{updateName: this.updateName.bind(this),
                                      updateValue: this.updateValue.bind(this)}}/>
    });
    return (
      <div className="multipliers-wrapper">
        <h3>Multipliers</h3>
        <form action="">
          <table>
            <thead>
              <tr>
                <th>Multiplier</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {multipliers}
            </tbody>
              <AddMultiplier onAddMultipliers={this.props.onAddMultipliers} />
          </table>
        </form>
      </div>
    );
  }

}

Multipliers.propTypes = {
  multipliers : PropTypes.arrayOf(PropTypes.object),
  onAddMultipliers: PropTypes.func,
};

export default Multipliers;

class Multiplier extends Component {

  render() {

    return (
      <tr key={this.props.name}>
        <Name key={this.props.name} id={this.props.id} name={this.props.name} updateName={this.props.callBacks.updateName}  />
        <Value key={this.props.id} id={this.props.id} value={this.props.value} updateValue={this.props.callBacks.updateValue} />
      </tr>
    );
  }
}

Multiplier.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  callBacks: PropTypes.object.isRequired,
};

class Name extends Component  {

  setName(e) {
    e.preventDefault();
    this.props.updateName(this.props.id, e.target.value);
  }

  render() {

    return (
      <td className="multiplier-name">
        <input type="text" key={this.props.id} defaultValue={this.props.name} />
      </td>
    );
  }
}

Name.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  updateName: PropTypes.func
};

class Value extends Component {

  setValue(e) {
    e.preventDefault();
    this.props.updateValue(this.props.id, e.target.value);
  }

  render() {

    return (
      <td className="multiplier-value">
        <input type="text" key={this.props.id} defaultValue={this.props.value} onBlur={this.setValue.bind(this)}/>
      </td>
    );
  }
}

Value.propTypes = {
  id: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  updateValue: PropTypes.func
};

class AddMultiplier extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: ""
    }
  }

  onFocusHandler(e) {
    e.preventDefault();
    this.setState({
      error: "",
    });
  }

  onClickHandler(e) {
    e.preventDefault();

    if(/\S/.test(name) ) {
      let name = this.refs.name.value;
      let value = this.refs.value.value;
      this.refs.name.value = "";
      this.refs.value.value = "";
      this.props.onAddMultipliers(name, parseFloat(value));
    } else {
      this.setState({
        error: "Slow down.....you need a name and value",
      });
    }
  }

  render() {

    return (
      <tbody>
        <tr><td colSpan="2" style={{color: 'white',fontWeight: 'bold'}}>{this.state.error}</td></tr>
        <tr>
          <td><input type="text" ref="name" placeholder={"Name"} onFocus={this.onFocusHandler.bind(this)}/></td>
          <td><input type="number" step="0.01" ref="value"placeholder={"value"}/></td>
          <td><button onClick={this.onClickHandler.bind(this)}>+</button></td>
        </tr>
      </tbody>
    );
  }
}

AddMultiplier.propTypes = {
  onAddMultipliers: PropTypes.func,
};