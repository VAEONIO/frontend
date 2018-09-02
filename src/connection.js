//import ScatterJS from "./scatter/scatter.esm";
import ScatterJS from "scatter-js/dist/scatter.esm";

import Eos from "eosjs";

const network = {
  blockchain: "eos",
  host: "user-api.eoseoul.io",
  port: 443,
  protocol: "https",
  chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
};

let scatter;

function connect(callback) {
  ScatterJS.scatter.connect("vaeon.io").then(connected => {
    if (!connected) return false;
    scatter = ScatterJS.scatter;
    getAccountAndEos(callback);
  });
}

function login(callback) {
  const requiredFields = { accounts: [network] };
  scatter
    .getIdentity(requiredFields)
    .then(() => getAccountAndEos(callback))
    .catch(error => {
      console.error(error);
    });
}

function getAccountAndEos(callback) {
  if (scatter.identity) {
    const account = scatter.identity.accounts.find(x => x.blockchain === "eos");

    const eosOptions = {
      httpEndpoint: "https://user-api.eoseoul.io:443",
      expireInSeconds: 60
    };
    const eos = scatter.eos(network, Eos, eosOptions);
    callback(account, eos);
  }
}

export { connect, login };
