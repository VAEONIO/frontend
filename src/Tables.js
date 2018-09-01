import React, { Component } from "react";
import "./Tables.css";
import Table from "./Table";

class T {
  constructor(code, scope, name) {
    this.code = code;
    this.scope = scope;
    this.name = name;
  }
}

const tables = [
  new T("vaeonxxvaeon", "vaeonxxvaeon", "profiles"),
  new T("vaeonxxvaeon", "vaeonxxvaeon", "fields"),
  new T("vaeonxxvaeon", "vaeonxxvaeon", "requests"),
  new T("vaeonxxvaeon", "vaeonxxvaeon", "reqin"),
  new T("vaeonxxvaeon", "vaeonxxvaeon", "reqdone")
];

class Tables extends Component {
  render() {
    return (
      <div className="Tables">
        {tables.map((table, i) => (
          <Table
            key={i}
            eos={this.props.eos}
            code={table.code}
            scope={table.scope}
            name={table.name}
          />
        ))}
      </div>
    );
  }
}

export default Tables;
