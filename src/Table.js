import React, { Component } from "react";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = { rows: [] };
    this.props.eos
      .getTableRows({
        code: this.props.code,
        scope: this.props.scope,
        table: this.props.name,
        json: true
      })
      .then(table => {
        this.setState({ rows: table.rows });
      })
      .catch(console.error);
  }

  render() {
    return (
      <table>
        <caption>{this.props.name}</caption>
        <thead>
          {this.state.rows.length > 0 && (
            <tr>
              {Object.keys(this.state.rows[0]).map((column, i) => (
                <td key={i}>{column}</td>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {this.state.rows.map((row, i) => (
            <tr key={i}>
              {Object.keys(row).map((column, j) => (
                <td key={j}>
                  {JSON.stringify(row[column], null, 1).replace(/"/g, "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table;
