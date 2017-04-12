import React from "react";
import ReactDOM from "react-dom";
import {browserHistory} from "react-router";

class StarTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    Object.assign(this.state, {
      sortKey: "distance",
      sortType: "number",
      sortOrder: 1
    });

    Object.assign(this.state, {
      magnitudeFilter: { min: null, max: null },
      distanceFilter: { min: null, max: null }
    });
  }
  componentDidMount() {

    $(ReactDOM.findDOMNode(this.refs.magnitude_slider)).slider({
      range: true, step: 0.01,
      slide: (event, ui) => this.setState({ magnitudeFilter: { min: ui.values[0], max: ui.values[1] } })
    }).slider("disable");

    $(ReactDOM.findDOMNode(this.refs.distance_slider)).slider({
      range: true, step: 0.005,
      slide: (event, ui) => this.setState({ distanceFilter: { min: ui.values[0], max: ui.values[1] } })
    }).slider("disable");
  }
  componentWillReceiveProps(newProps) {
    if (newProps.data !== this.props.data) {
      if (newProps.data.length > 0) {
        var min, max;
    
        [min, max] = d3.extent(newProps.data.map(d => d.magnitude));
        this.setState({ magnitudeFilter: { min: min, max: max }});
        $(ReactDOM.findDOMNode(this.refs.magnitude_slider))
          .slider(newProps.data.length > 1 ? "enable" : "disable")
          .slider("option", "min", min)
          .slider("option", "max", max)
          .slider("values", [min, max]);
    
        [min, max] = d3.extent(newProps.data.map(d => d.distance));
        this.setState({ distanceFilter: { min: min, max: max }});
        $(ReactDOM.findDOMNode(this.refs.distance_slider))
          .slider(newProps.data.length > 1 ? "enable" : "disable")
          .slider("option", "min", min)
          .slider("option", "max", max)
          .slider("values", [min, max]);
      }
    }
  }
  sortBy(key, type) {
    this.setState({
      sortKey: key,
      sortType: type,
      sortOrder: key == this.state.sortKey ? -this.state.sortOrder : this.state.sortOrder
    });
  }
  render() {

    return (
      <table className="table table-condensed table-hover">
        <thead>
          <tr>
            <td style={{minWidth: 30}}></td>
            <td style={{width: "30%"}} role="button" onClick={() => this.sortBy("display_name", "string")}><strong>Name</strong></td>
            <td style={{width: "20%"}} role="button" onClick={() => this.sortBy("magnitude", "number")}><strong>K-Band Magnitude</strong></td>
            <td style={{width: "20%"}} role="button" onClick={() => this.sortBy("distance", "number")}><strong>Distance from Sgr&nbsp;A*</strong></td>
            <td style={{width: "10%"}} role="button" onClick={() => this.sortBy("N_orbit", "number")}><strong>Orbits</strong></td>
            <td style={{width: "10%"}} role="button" onClick={() => this.sortBy("N_proper_motion", "number")}><strong>Proper Motions</strong></td>
          </tr>
          <tr>
            <td></td>
            <td>{this.props.data.length} star(s)</td>
            <td><div style={{width: "90%"}} ref="magnitude_slider"></div></td>
            <td><div style={{width: "90%"}} ref="distance_slider"></div></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
        {
          this.props.data
            .sort((a, b) => this.state.sortType == "string" ? 
              this.state.sortOrder * a[this.state.sortKey].localeCompare(b[this.state.sortKey]) :
              this.state.sortOrder * (a[this.state.sortKey] - b[this.state.sortKey]))
            .filter(d => 
              (this.props.data.length == 1) ||
              (d.magnitude <= this.state.magnitudeFilter.max) &&
              (d.magnitude >= this.state.magnitudeFilter.min) &&
              (d.distance <= this.state.distanceFilter.max) &&
              (d.distance >= this.state.distanceFilter.min))
            .map((d, i) =>
              <tr key={i}>
                <td style={{minWidth: 30}}><span role="button" className={"glyphicon glyphicon-" + this.props.icon} onClick={() => this.props.bookmarkAction(d)}></span></td>
                <td style={{width: "30%"}}><a role="button" onClick={() => browserHistory.push(`/stars/${d.id}`)} style={{display: "block"}}>{d.display_name ? d.display_name : "(no name)"}</a></td>
                <td style={{width: "20%"}}>{d.magnitude.toFixed(1)}</td>
                <td style={{width: "20%"}}>{d.distance ? `${d.distance.toFixed(3)} as` : ""}</td>
                <td style={{width: "10%"}}>{d.N_orbit > 0 ? d.N_orbit : ""}</td>
                <td style={{width: "10%"}}>{d.N_proper_motion > 0 ? d.N_proper_motion : ""}</td>
              </tr>)
        }
        </tbody>
      </table>
    );
  }
}

export default StarTable;
