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
    console.log(this.props.multipliers[id]);
  }

  updateValue(id, value) {
    this.props.multipliers[id].value = parseInt(value,10);
    this.setState(this.props);
    console.log(this.props.multipliers[id]);
  }


  render() {
    let multipliers = this.props.multipliers.map((multiplier) => {
      return <Multiplier key={multiplier.id}
                         id={multiplier.id}
                          name={multiplier.name}
                          value={multiplier.value}
                          callBacks={{updateName: this.updateName.bind(this),
                                      updateValue: this.updateValue.bind(this)}}/>
    });
    return (
      <div className="multipliers-wrapper">
        <h3>Multipliers</h3>
        <form action="">
          <table>
            <tbody>

            <tr>
              <td>Multiplier</td>
              <td>Value</td>
            </tr>
              {multipliers}
            </tbody>
          </table>
        </form>
      </div>
    );
  }

}

Multipliers.propTypes = {
  multipliers : PropTypes.arrayOf(PropTypes.object),
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
        <input type="text" key={this.props.id} defaultValue={this.props.name} onBlur={this.setName.bind(this)}/>
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