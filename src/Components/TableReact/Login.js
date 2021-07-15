import React, { Component } from "react";
import TableReact from "./TableReact.js";
import "./Login.scss";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
      success: false,
      failure: false,
    };
  }
  changeEvents = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value,
      failure: false,
      success: false,
    });
  };
  submit = (event) => {
    event.preventDefault();
    if (this.state.userName === "bindu" && this.state.password === "1234") {
      this.setState({
        success: true,
        failure: false,
      });
    } else {
      this.setState({
        failure: true,
      });
    }
  };
  loginForm = () => {
    return (
      <div className="form">
        <div className="login-page">
          {this.state.failure && <div className="invalid">Login Failure</div>}
          <fieldset>
            <legend>Login details</legend>
            <div className="admin">Admin Login</div>
            <div className="login-details">
              <div className="login-feilds">
                <label>UserName</label>
                <input
                  type="text"
                  className="username"
                  name="userName"
                  placeholder="Enter username"
                  autoComplete="off"
                  onChange={this.changeEvents}
                />
              </div>
              <div className="login-feilds">
                <label>Password</label>
                <input
                  type="password"
                  className="password"
                  name="password"
                  placeholder="Enter password"
                  autoComplete="off"
                  onChange={this.changeEvents}
                />
              </div>
              <button
                type="submit"
                className="submit-button"
                onClick={this.submit}
              >
                {" "}
                Login
              </button>
            </div>
          </fieldset>
        </div>
      </div>
    );
  };
  render() {
    return <div>{this.state.success ? <TableReact /> : this.loginForm()}</div>;
  }
}
export default Login;
