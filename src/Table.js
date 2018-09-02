import React, { Component } from "react";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = { rows: [] };
    this.update = this.update.bind(this);
    this.update();
  }

  update() {
    const rows = new Array(this.props.scopes.length);
    let pending = this.props.scopes.length;
    for (let i = 0; i < this.props.scopes.length; i++) {
      this.props.eos
        .getTableRows({
          code: this.props.code,
          scope: this.props.scopes[i],
          table: this.props.name,
          json: true
        })
        .then(scope => {
          rows[i] = scope.rows;
          pending--;
          if (pending === 0) {
            const newRows = [].concat.apply([], rows);
            this.setState({ rows: newRows });
            if (this.props.onUpdate !== undefined) {
              this.props.onUpdate(newRows.map(row => row.account));
            }
          }
        })
        .catch(err => {
          pending--;
          console.error(err);
        });
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if (
      this.props.updateTime !== previousProps.updateTime ||
      JSON.stringify(this.props.scopes) !== JSON.stringify(previousProps.scopes)
    ) {
      setTimeout(this.update, 1000);
    }
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
