import React, { Component } from "react";
import "./Tables.css";
import Table from "./Table";

class T {
  constructor(code, name) {
    this.code = code;
    this.name = name;
  }
}
const profileTable = new T("vaeonxxvaeon", "profiles");
const tables = [
  new T("vaeonxxvaeon", "fields"),
  new T("vaeonxxvaeon", "requests"),
  new T("vaeonxxvaeon", "reqin"),
  new T("vaeonxxvaeon", "reqdone")
];

class Tables extends Component {
  constructor(props) {
    super(props);
    this.updateAccounts = this.updateAccounts.bind(this);
    this.state = {
      accounts: []
    };
  }

  render() {
    return (
      <div className="Tables">
        <Table
          key={0}
          eos={this.props.eos}
          code={profileTable.code}
          scopes={["vaeonxxvaeon"]}
          name={profileTable.name}
          updateTime={this.props.updateTime}
          onUpdate={this.updateAccounts}
        />
        {tables.map((table, i) => (
          <Table
            key={i + 1}
            eos={this.props.eos}
            code={table.code}
            scopes={this.state.accounts}
            name={table.name}
            updateTime={this.props.updateTime}
          />
        ))}
      </div>
    );
  }

  updateAccounts(accounts) {
    this.setState({ accounts: accounts });
  }
}

export default Tables;
