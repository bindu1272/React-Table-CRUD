import React, { Component } from "react";
import "./Components/Utils/TableStyles.css";
import Login from './Components/TableReact/Login.js';

class App extends Component {
  render() {
    return (
      <div className="table-crud">
        <Login/>
      </div>
    );
  }
}
export default App;
