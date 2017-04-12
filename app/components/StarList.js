import React from "react";
import ReactDOM from "react-dom";
import StarTable from "./StarTable";
import BookmarkActions from "../actions/BookmarkActions";
import StarListStore from "../stores/StarListStore";
import StarListActions from "../actions/StarListActions";
import {parseNumber} from "../modules/Tools";

class StarList extends React.Component {
  constructor(props) {
    super(props);
    this.state = StarListStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    StarListStore.listen(this.onChange);
    StarListActions.getStarList(this.state.query);
  }
  componentWillUnmount() {
    StarListStore.unlisten(this.onChange);
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

    return (
      <div>
        <form className="form-horizontal">
          <div className="form-group">
            <label className="col-xs-2 control-label">Name</label>
            <div className="col-xs-6">
              <input type="text" className="form-control" value={this.state.query.name} onChange={() => StarListActions.updateQuery({ name: event.target.value })} placeholder="Name"/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-2 control-label">Search Radius</label>
            <div className="col-xs-2">
              <input type="text" className="form-control" type="number" step="0.001" value={this.state.query.x} onChange={() => StarListActions.updateQuery({ x: parseNumber(event.target.value) })} placeholder="x (as)"/>
            </div>
            <div className="col-xs-2">
              <input type="text" className="form-control" type="number" step="0.001" value={this.state.query.y} onChange={() => StarListActions.updateQuery({ y: parseNumber(event.target.value) })} placeholder="y (as)"/>
            </div>
            <div className="col-xs-2">
              <input type="text" className="form-control" type="number" step="0.001" min="0" value={this.state.query.r} onChange={() => StarListActions.updateQuery({ r: parseNumber(event.target.value) })} placeholder="r (as)"/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-6 col-md-offset-2">
              <div className="checkbox">
                <label>
                  <input type="checkbox" checked={this.state.query.orbit} onChange={() => StarListActions.updateQuery({ orbit: !this.state.query.orbit })}/> at least one orbit measurement
                </label>
              </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" checked={this.state.query.pm} onChange={() => StarListActions.updateQuery({ pm: !this.state.query.pm })}/> at least one proper motion measurement
                </label>
              </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" checked={this.state.query.vz} onChange={() => StarListActions.updateQuery({ vz: !this.state.query.vz })}/> at least one radial velocity measurement
                </label>
              </div>              
            </div>
          </div>          
          <div className="form-group">
            <label className="col-xs-2 control-label">Limit</label>
            <div className="col-xs-2">
              <select className="form-control" value={this.state.query.limit} onChange={() => StarListActions.updateQuery({ limit: event.target.value })}>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
              </select>
            </div>
            <div className="col-xs-6">
              <span role="button" className="btn btn-primary" onClick={() => StarListActions.getStarList(this.state.query)}>Submit</span>
            </div>           
          </div>
        </form>
        <StarTable data={this.state.data} bookmarkAction={BookmarkActions.addBookmark} icon="plus"/>
      </div>
    );
  }
}

export default StarList;
