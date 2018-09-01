import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Eos from "eosjs";
import Tables from "./Tables";
import Actions from "./Actions";
import Command from "./Command";
import Error from "./Error";
import ScatterJS from "scatter-js/dist/scatter.esm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    //this.handleClick = this.handleClick.bind(this);

    const network = {
      blockchain: "eos",
      host: "user-api.eoseoul.io",
      port: 80,
      protocol: "http",
      chainId:
        "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
    };

    ScatterJS.scatter.connect("vaeon.io").then(connected => {
      if (!connected) return false;
      const scatter = ScatterJS.scatter;
      const requiredFields = { accounts: [network] };
      scatter
        .getIdentity(requiredFields)
        .then(() => {
          this.setState({
            account: scatter.identity.accounts.find(x => x.blockchain === "eos")
          });

          const eosOptions = {
            httpEndpoint: "http://user-api.eoseoul.io:80",
            expireInSeconds: 60
          };
          this.setState({ eos: scatter.eos(network, Eos, eosOptions) });
        })
        .catch(error => {
          console.error(error);
        });
    });
  }

  // ----------------------------
  // Now that we have an identity,
  // an EOSIO account, and a reference
  // to an eosjs object we can send a transaction.
  // ----------------------------

  // Never assume the account's permission/authority. Always take it from the returned account.
  //const transactionOptions = {
  //  authorization: [`${account.name}@${account.authority}`]
  //};

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

  render() {
    return (
      <div className="App">
        <Tables eos={this.state.eos} />
        <div className="row">
          <Actions />
        </div>
        <div className="row">
          <Command />
        </div>
        <div className="row">
          <Error />
        </div>
      </div>
    );
  }
}

export default App;
