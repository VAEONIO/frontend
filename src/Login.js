import React, { Component } from "react";
import "./Login.css";
import VaeonLogo from "./VaeonLogo";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="Login">
        <VaeonLogo />
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="Login with Scatter" />
        </form>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onLogin();
  }
}

export default Login;
