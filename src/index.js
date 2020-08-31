import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from 'history';
const hist = createBrowserHistory();
ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/app" component={App}></Route>
      <Redirect from="/" to="/app" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
