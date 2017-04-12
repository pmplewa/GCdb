import React from "react";
import ReactDOM from "react-dom";
import StarStore from "../stores/StarStore";
import StarActions from "../actions/StarActions";
import {R0, mu, rad2deg, as2rad} from "../modules/Constants"
import Citation from "../modules/Citation";
import * as OrbitalMechanics from "../modules/OrbitalMechanics";
import {OrbitLocator, ProperMotionLocator} from "./Locators";
import OrbitChart from "./OrbitChart";
import VelocityChart from "./VelocityChart";

const DefaultComponent = (props) =>
  <div className="panel panel-info">
    <div className="panel-heading">Stellar Parameters</div>
    <div className="panel-body">
      <div className="row">
        <div className="col-sm-2">
          <h5>Names</h5>
          <ul className="list-unstyled">
          { props.name.map((d, i) => <li key={i}>{d}</li>) }
          </ul>
        </div>
        <div className="col-sm-4">
          <h5>Magnitudes</h5>
          <ul className="list-unstyled">
          { props.magnitude.map((d, i) => <li key={i}>{`${d.band} = ${d.value.toFixed(1)}`} (<Citation data={d}/>)</li>) }
          </ul>
        </div>
        <div className="col-sm-4">
          <h5>Classifications</h5>
          <ul className="list-unstyled">
          { props.type.map((d, i) => <li key={i}>{`${d.value}`} (<Citation data={d}/>)</li>) }
          </ul>
        </div>
      </div>
    </div>
  </div>;

const OrbitComponent = (props) => 
  <div className="panel panel-info">
    <div className="panel-heading">Orbital Elements</div>
    <div className="panel-body">
    { 
      props.data.map((d, i) =>
        <div key={i}>
          <table className="table table-condensed">
            <tbody>
              <tr className="firstrow"><td>a</td><td>{`${d.a.toFixed(3)} ± ${d.a_err.toFixed(3)} as`}</td><td>semi-major axis</td></tr>
              <tr><td>e</td><td>{`${d.e.toFixed(3)} ± ${d.e_err.toFixed(3)}`}</td><td>eccentricity</td></tr>
              <tr><td>i</td><td>{`${rad2deg(d.inc).toFixed(2)}° ± ${rad2deg(d.inc_err).toFixed(2)}°`}</td><td>inclination</td></tr>
              <tr><td>Ω</td><td>{`${rad2deg(d.Omega).toFixed(2)}° ± ${rad2deg(d.Omega_err).toFixed(2)}°`}</td><td>position angle of  ascending node</td></tr>
              <tr><td>ω</td><td>{`${rad2deg(d.omega).toFixed(2)}° ± ${rad2deg(d.omega_err).toFixed(2)}°`}</td><td>longitude of periastron</td></tr>
              <tr><td>t<sub>p</sub></td><td>{`${d.t0.toFixed(2)} ± ${d.t0_err.toFixed(2)}`}</td><td>epoch of pericenter passage</td></tr>
              <tr className="active"><td>P</td><td>{d.e < 1 ? `${OrbitalMechanics.period(d, mu).toFixed(2)} yrs` : "unbound"}</td><td>orbital period</td></tr>
              <tr className="active"><td>r<sub>p</sub></td><td>{`${(as2rad(d.a * (1 - d.e)) * R0).toFixed(5)} pc`}</td><td>pericenter distance (3D)</td></tr>
            </tbody>
          </table>
          <div className="text-right"><Citation data={d}/></div>
        </div>)
    }
    </div>
    <OrbitLocator data={props.data[0]}/>
  </div>;

const ProperMotionComponent = (props) => 
  <div className="panel panel-info">
    <div className="panel-heading">Proper Motion</div>
    <div className="panel-body">
    { 
      props.data.map((d, i) =>
      <div key={i}>
        <table className="table table-condensed">
          <tbody>
            <tr className="firstrow"><td>t<sub>0</sub></td><td>{d.t0.toFixed(2)}</td><td>reference epoch</td></tr>
            <tr><td>x<sub>0</sub></td><td>{`${d.x0.toFixed(3)} as ± ${(1e3 * d.x0_err).toFixed(2)} mas`}</td><td>angular offset from Sgr A* along right ascension</td></tr>
            <tr><td>y<sub>0</sub></td><td>{`${d.y0.toFixed(3)} as ± ${(1e3 * d.y0_err).toFixed(2)} mas`}</td><td>angular offset from Sgr A* along declination</td></tr>
            <tr><td>v<sub>x</sub></td><td>{`${(1e3 * d.vx).toFixed(3)} ± ${(1e3 * d.vx_err).toFixed(3)} mas/yr`}</td><td>proper motion along right ascension</td></tr>
            <tr><td>v<sub>y</sub></td><td>{`${(1e3 * d.vy).toFixed(3)} ± ${(1e3 * d.vy_err).toFixed(3)} mas/yr`}</td><td>proper motion along declination</td></tr>
            { d.ar ? <tr><td>a<sub>r</sub></td><td>{`${(1e3 * d.ar).toFixed(3)} ± ${(1e3 * d.ar_err).toFixed(3)} mas/yr²`}</td><td>acceleration in the radial direction</td></tr> : null }
            { d.ar_upper ? <tr><td>a<sub>r</sub></td><td>{`> ${(1e3 * d.ar_upper).toFixed(3)} mas/yr²`}</td><td>acceleration in the radial direction (upper limit)</td></tr> : null }
          </tbody>
        </table>
        <div className="text-right"><Citation data={d}/></div>
      </div>)
    }
    </div>
    <ProperMotionLocator data={props.data[0]}/>
  </div>;

const SourceComponent = (props) =>
  <div className="panel panel-info">
    <div className="panel-heading">References</div>
    <div className="panel-body">
    {
      props.data.map(d => <p><Citation data={d}/> / Table {d.table} / Row {d.id}</p>)
    }
    </div>
  </div>;

class ChartComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    OrbitChart.create(ReactDOM.findDOMNode(this.refs.orbit), this.props.data);
    VelocityChart.create(ReactDOM.findDOMNode(this.refs.velocity), this.props.data);
  }
  componentDidUpdate() {
    OrbitChart.update(ReactDOM.findDOMNode(this.refs.orbit), this.props.data);
    VelocityChart.update(ReactDOM.findDOMNode(this.refs.velocity), this.props.data);
  }
  componentWillUnmount() {
    OrbitChart.destroy(ReactDOM.findDOMNode(this.refs.orbit));
    VelocityChart.destroy(ReactDOM.findDOMNode(this.refs.velocity));
  }
  render() {
    return (
      <div className="panel panel-info">
        <div className="panel-heading">Orbit Preview (<Citation data={this.props.data}/>)</div>
        <div className="panel-body row">
          <div className="chart col-sm-6" ref="orbit"></div>
          <div className="chart col-sm-6" ref="velocity"></div>
        </div>
      </div>
    );
  }
}

class Star extends React.Component {
  constructor(props) {
    super(props);
    this.state = StarStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    StarStore.listen(this.onChange);
    StarActions.getStar(this.props.params.id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.params.id !== this.props.params.id) {
      StarActions.getStar(this.props.params.id);
    }
  }
  componentWillUnmount() {
    StarStore.unlisten(this.onChange);
  }
  onChange(state) {
    this.setState(state);
  }
  render() {
    if (this.state.status) {
      return (
        <div className={`alert alert-${this.state.status}`} role="alert">
          <strong>Oh snap!</strong> {this.state.message}
        </div>
      );
    }

    if (!this.state.data) return null;

    var star = this.state.data;

    return (
      <div>
        <DefaultComponent name={star.name} magnitude={star.magnitude} type={star.type}/>
        { star.orbit.length > 0 ? <OrbitComponent data={star.orbit}/> : null }
        { star.proper_motion.length > 0 ? <ProperMotionComponent data={star.proper_motion}/> : null }
        { star.orbit.length > 0 && star.orbit[0].e < 1 ? <ChartComponent data={star.orbit[0]}/> : null }
        <SourceComponent data={star.source}/>
      </div>
    );
  }
}

export default Star;
