import React,{Component, PropTypes} from 'react';
import _  from 'lodash';
import Queries from './Queries';
import Multipliers from './Multipliers';
import './App.css';

class Breakpoints extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      breakpoints: this.props.breakpoints,
      multipliers: this.props.multipliers,
      queries: this.props.queries,
      newBreakpointName: "",
      newBreakpointWidth: 0,
    };

    this.counter = 7;
  }

  componentWillMount() {
    this.breakpointHandler();
    //this.updateBreakpointMultipliers();
  }

  // sort from least to greatest
  sortPoints(points) {
    return points.sort(function(a,b) {
      return a[0] - b[0] ;
    });
  }

  breakpointHandler() {
    var points = [];
    // add the props array in the points array
    for (let i = 0; i < this.props.queries.length; i++) {
      points.push(this.state.queries[i].points);
    }
    //sort the points from least to greatest in width
    this.sortPoints(points);

    for(var i=0; i<this.props.breakpoints.length; i++) {
       this.setBreakpointHeight(i,points,this.props.breakpoints[i].width);
    }

    this.updateBreakpointMultipliers();
  }
  // check where a breakpoint width is within a given coordinates driven by the queries entered in.
  setBreakpointHeight(index,points,width) {

    if(width <= points[0][0]) {
      // Width less than smallest point
      this.props.breakpoints[index].height = Math.floor(points[0][1]/points[0][0]*width);

      this.props.breakpoints[index].aspectRatio = Math.round((points[0][1]/points[0][0])*1000)/1000;

    } else if(width >= points[points.length-1][0]) { // Width greater than largest point

      this.props.breakpoints[index].height = Math.floor(points[points.length-1][1]/points[points.length-1][0]*width);

      this.props.breakpoints[index].aspectRatio = Math.round((points[points.length-1][1]/points[points.length-1][0])*1000)/1000;
    } else { // Width between points

      for(var i=0; i<points.length; i++) {

        if (width < points[i][0]) {

          var slope = (points[i][1]-points[i-1][1])/(points[i][0]-points[i-1][0]);

          var height = (points[i][1] - slope*(points[i][0]-width));

          this.props.breakpoints[index].height = Math.floor(height);

          this.props.breakpoints[index].aspectRatio = Math.round((width/height)*1000)/1000;
        }
      }
    }

  }

  updateName(id, name) {
    this.props.breakpoints[id].name = name;
    this.setState(this.props);
  }

  updateWidth(id, width) {
    this.props.breakpoints[id].width = parseInt(width,10);
    this.setState(this.props);
    this.breakpointHandler();
  }

  updateHeight(id, height) {
    this.props.breakpoints[id].height = parseInt(height,10);
    this.setState(this.props);
  }

  updateAspectRatio(id, aspectRatio) {
    this.props.breakpoints[id].aspectRatio = parseInt(aspectRatio,10);
    this.setState(this.props);
  }

  updateCompWidth(id,width){
    this.props.queries[id].points[0] = parseInt(width,10);
    this.setState(this.props);
    this.breakpointHandler();
  }

  updateCompHeight(id, height) {
    this.props.queries[id].points[1] = parseInt(height,10);
    this.setState(this.props);
    this.breakpointHandler();
  }

  updateBreakpointMultipliers() {
    for (let i = 0; i < this.props.breakpoints.length; i++) {
      this.props.breakpoints[i].multipliers = _.cloneDeep(this.state.multipliers);
      for (let j = 0; j < this.props.multipliers.length; j++) {
        let width = this.props.breakpoints[i].multipliers[j].value * this.props.breakpoints[i].width;
        let height = this.props.breakpoints[i].multipliers[j].value * this.props.breakpoints[i].height;

        this.props.breakpoints[i].multipliers[j].width = width;
        this.props.breakpoints[i].multipliers[j].height = height;
      }
    }
    this.setState({breakpoints: this.props.breakpoints});
  }

  onAddBreakpoint(name,width) {

    let breakpoint = {
      id: this.counter,
      name: name,
      width: parseInt(width,10),
      height: 0,
      aspectRatio: 0,
      multipliers: [this.state.multipliers],
    };

    this.props.breakpoints.push(breakpoint);
    this.setState({breakpoints: this.props.breakpoints});
    this.counter += 1;
    console.log("onAdd: "+ this.props.breakpoints);
    this.breakpointHandler();
  }

  render(){
    let breakpoints = this.props.breakpoints.map((breakpoint)=>{
      return <Breakpoint key={breakpoint.id}
                         id={breakpoint.id}
                         name={breakpoint.name}
                         width={breakpoint.width}
                         height={breakpoint.height}
                         aspectRatio={breakpoint.aspectRatio}
                         breakpointMultipliers={breakpoint.multipliers}
                         callBacks={{updateName: this.updateName.bind(this),
                                  updateWidth: this.updateWidth.bind(this),
                                  updateHeight: this.updateHeight.bind(this),
                                  updateAspectRatio: this.updateAspectRatio.bind(this)
                                  }}/>
    });
    return (
      <div className="container">
        <aside className="input-wrapper col col__left">
          <article className="queries">
            <Queries queries={this.props.queries} callbacks={{updateCompWidth: this.updateCompWidth.bind(this),
                                                              updateCompHeight: this.updateCompHeight.bind(this)}}/>
          </article>
          <article className="multipliers">
            <Multipliers key="multipliers" multipliers={this.props.multipliers} />
          </article>
        </aside>
        <article className="breakpoints col col__right">
          <div className="inner-wrapper">
            <h3>Breakpoints</h3>
            <table>
              <thead>
                <tr className="breakpoints-headers">
                  <th>Name</th><th>Width</th><th>Height</th><th>A/R</th>
                </tr>
              </thead>
              {breakpoints}
              <tbody>
              <AddBreakpoints name={this.state.newBreakpointName} width={this.state.newBreakpointWidth} onAddBreakpoint={this.onAddBreakpoint.bind(this)}/>
              </tbody>
            </table>
          </div>
        </article>
      </div>
    );
  }

}

Breakpoints.propTypes = {
  breakpoints: PropTypes.arrayOf(PropTypes.object).isRequired,
  multipliers: PropTypes.arrayOf(PropTypes.object).isRequired,
  queries: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Breakpoints;

class Breakpoint extends Component {

  render() {
      let breakpointMultipliers = this.props.breakpointMultipliers.map((breakpointMultiplier) => {
        return <BreakpointMultiplier key={breakpointMultiplier.id} id={breakpointMultiplier.id} breakpointMultiplier={breakpointMultiplier}/>
      });
    return (
      <tbody>
        <tr className="breakpoint" key={this.props.name}>
          <BreakpointName key={this.props.name} id={this.props.id} name={this.props.name} updateName={this.props.callBacks.updateName}/>
          <BreakpointWidth key={this.props.width} id={this.props.id} width={this.props.width} updateWidth={this.props.callBacks.updateWidth} />
          <BreakpointHeight key={this.props.name+this.props.id} id={this.props.id} height={this.props.height} updateHeight={this.props.callBacks.updateHeight} />
          <BreakpointAspectRatio key={"aspectRatio"+this.props.id} id={this.props.id} aspectRatio={this.props.aspectRatio} updateAspectRatio={this.props.callBacks.updateAspectRatio} />
        </tr>
        <tr className="breakpoint-multipliers">
          <th colSpan="4">Multipliers</th>
        </tr>
        {breakpointMultipliers}
      </tbody>
    );
  }
}

Breakpoint.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  breakpointMultipliers: PropTypes.arrayOf(PropTypes.object).isRequired,
  callBacks: PropTypes.object
};

class AddBreakpoints extends Component {

  constructor() {
    super(...arguments);
    this.state =({
      name: this.props.name,
      width: this.props.width
    });
  }

  nameChangeHandler(e) {
    e.preventDefault();
    this.setState({name:e.target.value});
  }

  widthChangeHandler(e) {
    e.preventDefault();
    this.setState({width: e.target.value});
  }

  onClickHandler(e) {
    e.preventDefault();
    this.props.onAddBreakpoint(this.state.name, this.state.width);
  }

  render() {

    return (
      <tr>
        <td><input type="text" placeholder={"Name"} onBlur={this.nameChangeHandler.bind(this)}/></td>
        <td><input type="text" placeholder={"Width"} onBlur={this.widthChangeHandler.bind(this)}/></td>
        <td><button onClick={this.onClickHandler.bind(this)}>+</button></td>
      </tr>
    );
  }
}

AddBreakpoints.propTypes = {
  onAddBreakpoint: PropTypes.func,
  name: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

class BreakpointName extends Component{

  setName(e) {
    e.preventDefault();
    this.props.updateName(this.props.id, e.target.value)
  }

  render() {
    return (
      <td className="item breakpoint-name">
        <input key={this.props.id} type="text" defaultValue={this.props.name} onBlur={this.setName.bind(this)}/>
      </td>
    );
  }
}

BreakpointName.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  updateName: PropTypes.func
};

class BreakpointWidth extends Component {

  setWidth(e) {
    e.preventDefault();
    this.props.updateWidth(this.props.id, e.target.value)
  }

  render() {
    return (
      <td className="item height">
        <input key={this.props.id} type="text" defaultValue={this.props.width} onBlur={this.setWidth.bind(this)}/>
      </td>
    );
  }
}

BreakpointWidth.propTypes = {
  id: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  updateWidth: PropTypes.func
};

class BreakpointHeight extends Component {

  setHeight(e) {
    e.preventDefault();
    this.props.updateHeight(this.props.id, e.target.value)
  }

  render() {
    return (
      <td className="item height">
        <span key={this.props.id} > {this.props.height} </span>
      </td>
    );
  }
}

BreakpointHeight.propTypes = {
  id: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

class BreakpointAspectRatio extends Component {

  render() {
    return (
      <td className="item aspect-ratio">
        <span key={this.props.id}>{this.props.aspectRatio}</span>
      </td>
    );
  }
}

BreakpointAspectRatio.propTypes = {
  id: PropTypes.number.isRequired,
  aspectRatio: PropTypes.number.isRequired,
};

class BreakpointMultiplier extends Component {


  render() {
    return (
      <tr className="breakpoint-multipliers">
        <td>{this.props.breakpointMultiplier.name}</td>
        <td>{this.props.breakpointMultiplier.width}</td>
        <td>{this.props.breakpointMultiplier.height}</td>
        <td></td>
      </tr>
    );
  }

}

BreakpointMultiplier.propTypes = {
  id: PropTypes.number.isRequired,
  breakpointMultiplier: PropTypes.object.isRequired,
};

