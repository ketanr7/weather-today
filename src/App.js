import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./components/home/home.component";

import DailyData from "./components/daily-data/daily-data.component";

import "./App.css";

const google = window.google;

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/:city/:day" component={DailyData} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
