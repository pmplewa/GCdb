import React from "react";
import {Route} from "react-router";
import App from "./components/App";
import StarList from "./components/StarList";
import Star from "./components/Star";
import Documentation from "./components/Documentation";

export default (
  <Route component={App}>
    <Route path="/" component={StarList} />
    <Route path="/stars/:id" component={Star} />
    <Route path="/doc" component={Documentation} />
  </Route>
);
