import React from "react";
import {mu, asyr2kms, t0} from "../modules/Constants"
import * as OrbitalMechanics from "../modules/OrbitalMechanics";
import {parseNumber} from "../modules/Tools";

export class OrbitLocator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  onChange(event) {
    this.setState({ t: parseNumber(event.target.value) });
  }
  onClick() {
    var p = OrbitalMechanics.convert({
      a: this.props.data.a,
      e: this.props.data.e,
      inc: this.props.data.inc,
      Omega: this.props.data.Omega,
      omega: this.props.data.omega,
      M: OrbitalMechanics.meanMotion(this.props.data, mu) * (this.state.t - this.props.data.t0)
    }, mu);

    this.setState({ x: p.y, y: p.x, vz: asyr2kms(p.vz) });
  }
  render() {
    return (
      <div className="panel-footer">
      <table className="table" style={{marginBottom: 0}}>
        <tbody>
          <tr className="firstrow">
            <td className="input-group">
              <input className="form-control" type="number" step="0.01" min="0" onChange={this.onChange} placeholder={`Time (${t0.toFixed(2)})`}/>
              <span className="input-group-btn">
                <span role="button" className="btn btn-default" onClick={this.onClick}>Locate</span>
              </span>
            </td>
            <td className="text-center" style={{width: "20%"}}><input className="form-control" value={ this.state.y ? this.state.x.toFixed(3) : "" } placeholder="Δx (as)" readonly/></td>
            <td className="text-center" style={{width: "20%"}}><input className="form-control" value={ this.state.y ? this.state.y.toFixed(3) : "" } placeholder="Δy (as)" readonly/></td>
            <td className="text-center" style={{width: "20%"}}><input className="form-control" value={ this.state.vz ? this.state.vz.toFixed(2) : "" } placeholder="Δv (km/s)" readonly/></td>
          </tr>
        </tbody>
      </table>
      </div>
    );
  }
}

export class ProperMotionLocator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  onChange(event) {
    this.setState({ t: parseNumber(event.target.value) });
  }
  onClick() {
    var x = this.props.data.x0 + this.props.data.vx * (this.state.t - this.props.data.t0),
        y = this.props.data.y0 + this.props.data.vy * (this.state.t - this.props.data.t0);

    if (this.props.data.ax) x += this.props.data.ax/2 * Math.pow(this.state.t - this.props.data.t0, 2);
    if (this.props.data.ay) y += this.props.data.ay/2 * Math.pow(this.state.t - this.props.data.t0, 2);

    this.setState({ x: x, y: y });
  }
  render() {
    return (
      <div className="panel-footer">
      <table className="table" style={{marginBottom: 0}}>
        <tbody>
          <tr className="firstrow">
            <td className="input-group">
              <input className="form-control" type="number" step="0.01" min="0" onChange={this.onChange} placeholder={`Time (${t0.toFixed(2)})`}/>
              <span className="input-group-btn">
                <span role="button" className="btn btn-default" onClick={this.onClick}>Locate</span>
              </span>
            </td>
            <td className="text-center" style={{width: "30%"}}><input className="form-control" value={ this.state.y ? this.state.x.toFixed(3) : "" } placeholder="Δx (as)" readonly/></td>
            <td className="text-center" style={{width: "30%"}}><input className="form-control" value={ this.state.y ? this.state.y.toFixed(3) : "" } placeholder="Δy (as)" readonly/></td>
          </tr>
        </tbody>
      </table>
      </div>
    );
  }
}
