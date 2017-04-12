import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router";
import BookmarkList from "./BookmarkList";

class NavItem extends React.Component {
  render() {
    var isActive = this.context.router.isActive(this.props.to, this.props.params, this.props.query);
    return (
      <li role="presentation" className={isActive ? "active" : ""}><Link {...this.props}></Link></li>
    );
  }
}

NavItem.contextTypes = {
    router: PropTypes.object
};

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Galactic Center Stellar Database</h1>
        <nav style={{margin: "20px 0px"}}>
          <ul className="nav nav-tabs">
            <NavItem to="/">Starlist</NavItem>
            <NavItem to="/doc">Documentation</NavItem>
          </ul>
        </nav>
        <div>
          <BookmarkList/>
          <hr/>
          {this.props.children}
          <hr/>
        </div>
      </div>
    );
  }
}

export default App;
