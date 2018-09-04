import React, { Component } from "react";
import "./App.css";
import Tables from "./Tables";
import { connect, login } from "./connection";
import Actions from "./Actions";
import VaeonLogo from "./VaeonLogo";
import Login from "./Login";
//import Command from "./Command";
import Error from "./Error";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateTime: Date.now(),
      error: null,
      noScatter: false
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleActionExecution = this.handleActionExecution.bind(this);
    this.handleExecutionError = this.handleExecutionError.bind(this);
    this.setAccountAndEos = this.setAccountAndEos.bind(this);
    connect(this.setAccountAndEos);
  }

  render() {
    if (this.state.eos !== undefined) {
      return (
        <div className="App">
          <Tables
            eos={this.state.eos}
            account={this.state.account}
            updateTime={this.state.updateTime}
          />
          <div className="row">
            <Actions
              eos={this.state.eos}
              account={this.state.account}
              onExecution={this.handleActionExecution}
              onExecutionError={this.handleExecutionError}
            />
          </div>
          {this.state.error !== null && <Error message={this.state.error} />}
          <div className="App-footer row">
            <VaeonLogo />
          </div>
        </div>
      );
    } else {
      return (
        <Login onLogin={this.handleLogin} noScatter={this.state.noScatter} />
      );
    }
  }

  setAccountAndEos(account, eos, noScatter) {
    if (!noScatter) {
      this.setState({ account: account, eos: eos });
    } else {
      this.setState({ noScatter: true });
    }
  }

  handleLogin() {
    login(this.setAccountAndEos);
  }

  handleActionExecution() {
    this.setState({ error: null, updateTime: Date.now() });
  }

  handleExecutionError(message) {
    let error = JSON.parse(message);
    if (
      error.error !== undefined &&
      error.error.details !== undefined &&
      error.error.details[0] !== undefined &&
      error.error.details[0].message !== undefined
    ) {
      error = error.error.details[0].message;
    }
    this.setState({ error: JSON.stringify(error) });
  }
}

export default App;

//eos
//  .transfer(
//    account.name,
//    "vaeonxxvaeon",
//    "0.0001 EOS",
//    "memo",
//    transactionOptions
//  )
//  .then(trx => {
//    // That's it!
//    console.log(`Transaction ID: ${trx.transaction_id}`);
//  })
//  .catch(error => {
//    console.error(error);
//  });
