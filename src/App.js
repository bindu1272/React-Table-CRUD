import React, { Component } from "react";
import TableReact from "./Components/TableReact/TableReact";
import "./Components/Utils/TableStyles.css";
import { BrowserRouter as Router, Route, Link, Switch, NavLink } from "react-router-dom";
import Table from "./Components/TableInformation/Table.js";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <h1 align="center">Students Information</h1>
          <ul>
            <li>
              <NavLink to="/" activeClassName="active" exact>
                React Table
              </NavLink>
            </li>
            <li>
              <NavLink to="/normal-table" activeClassName="active" >
                Normal Table
              </NavLink>
            </li>
          </ul> 
          <Switch>
            <Route exact path="/" component={TableReact}></Route>
            <Route exact path="/normal-table" component={Table}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
