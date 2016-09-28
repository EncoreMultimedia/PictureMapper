/**
 * Created by jfortune on 9/11/16.
 */
import React,{Component, PropTypes} from 'react';

class Queries extends Component {

  updateCompHeight(id,height) {
    this.props.queries[id].points[1] = height;
    console.log(this.props.queries[id]);
  }

  render() {
    let queries = this.props.queries.map((query) => {
      return <Query key={query.id}
                    id={query.id}
                    width={query.points[0]}
                    height={query.points[1]}
                    callbacks={{
                      updateCompWidth: this.props.callbacks.updateCompWidth,
                      updateCompHeight: this.props.callbacks.updateCompHeight,
                      removeComp: this.props.callbacks.removeComp,
                    }}/>
    });
    return (
      <div className="queries-wrapper">
        <h3>Comp Sizes</h3>
          <table>
            <thead>
              <tr>
                <th>Width</th>
                <th>Height</th>
              </tr>
            </thead>
            <tbody>
              {queries}
            </tbody>
            <AddComp onAddComp={this.props.onAddComp} />
          </table>
      </div>
    );
  }
}

Queries.propTypes = {
  queries: PropTypes.arrayOf(PropTypes.object).isRequired,
  callbacks: PropTypes.object,
  onAddComp: PropTypes.func
};

export default Queries;

class Query extends Component {

  render() {
    return (
      <tr>
        <CompWidth key={this.props.id} id={this.props.id} width={this.props.width} updateWidth={this.props.callbacks.updateCompWidth} />
        <CompHeight key={this.props.height} id={this.props.id} height={this.props.height} updateHeight={this.props.callbacks.updateCompHeight} />
        <CompRemove key={"remove"+this.props.id} id={this.props.id} removeComp={this.props.callbacks.removeComp} />
      </tr>
    )
  }
}

Query.propTypes = {
  id: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  callbacks: PropTypes.object.isRequired,
};

class CompWidth extends Component {

  setWidth(e) {
    e.preventDefault();
    this.props.updateWidth(this.props.id, parseInt(e.target.value,10))
  }

  render() {
    return (
      <td className="queries-width">
        <input type="number" key={this.props.id} defaultValue={this.props.width} onBlur={this.setWidth.bind(this)}/>
      </td>
    );
  }
}

CompWidth.propTypes = {
  id: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  updateWidth: PropTypes.func,
};

class CompHeight extends Component {

  setHeight(e) {
    e.preventDefault();
    this.props.updateHeight(this.props.id, e.target.value)
  }

  render() {
    return (
      <td className="queries-height">
        <input type="number" key={this.props.id} defaultValue={this.props.height} onBlur={this.setHeight.bind(this)}/>
      </td>
    );
  }
}

CompHeight.propTypes = {
  id: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  updateHeight: PropTypes.func
};

class AddComp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: "",
    }
  }

  onFocusHandler(e) {
    e.preventDefault();
    this.setState({error:""})
  }

  onClickHandler(e) {
    e.preventDefault();
    let height = this.refs.height.value;
    let width = this.refs.width.value;
    if(/\S/.test(height) && (/\S/.test(width))){
      this.refs.height.value = "";
      this.refs.width.value = "";
      this.props.onAddComp(parseInt(height,10), parseInt(width,10));
    }else {
     this.setState({
       error: "Take a deep breath and add both height and width"
     })
    }
  }

  render() {

    return (
      <tbody>
        <tr><td colSpan="2" style={{color: 'white', fontWeight:'bold'}}>{this.state.error}</td></tr>
        <tr>
          <td><input type="number" ref="width" placeholder={"Width"} onFocus={this.onFocusHandler.bind(this)} /></td>
          <td><input type="number" ref="height" placeholder={"Height"} onFocus={this.onFocusHandler.bind(this)} /></td>
          <td><button onClick={this.onClickHandler.bind(this)}>+</button></td>
        </tr>
      </tbody>
    );
  }
}

AddComp.propTypes = {
  onAddComp: PropTypes.func,
};

class CompRemove extends Component {

  removeComp(e) {
    e.preventDefault();
    this.props.removeComp(this.props.id);
  }

  render() {
    return (
      <td><button onClick={this.removeComp.bind(this)}>x</button></td>
    );
  }
}

CompRemove.propTypes = {
  id: PropTypes.number.isRequired,
  removeComp: PropTypes.func
};