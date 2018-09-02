import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Tables from "./Tables";
import { connect, login } from "./connection";
import Actions from "./Actions";
import Login from "./Login";
import Command from "./Command";
import Error from "./Error";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateTime: Date.now()
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleActionExecution = this.handleActionExecution.bind(this);
    this.setAccountAndEos = this.setAccountAndEos.bind(this);
    connect(this.setAccountAndEos);
  }

  render() {
    if (this.state.eos !== undefined) {
      return (
        <div className="App">
          <Tables eos={this.state.eos} updateTime={this.state.updateTime} />
          <div className="row">
            <Actions
              eos={this.state.eos}
              account={this.state.account}
              onExecution={this.handleActionExecution}
            />
          </div>
          <div className="row">
            <Command />
          </div>
          <div className="row">
            <Error />
          </div>
        </div>
      );
    } else {
      return <Login onLogin={this.handleLogin} />;
    }
  }

  setAccountAndEos(account, eos) {
    this.setState({ account: account, eos: eos });
  }

  handleLogin() {
    login(this.setAccountAndEos);
  }

  handleActionExecution() {
    this.setState({ updateTime: Date.now() });
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
