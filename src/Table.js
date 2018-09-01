import React, { Component } from "react";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = { rows: [] };
  }

  componentDidUpdate() {
    if (this.props.eos !== undefined && !this.state.test) {
      this.setState({ test: true });
      this.props.eos
        .getTableRows({
          code: this.props.code,
          scope: this.props.scope,
          table: this.props.name,
          json: true
        })
        .then(table => this.setState({ rows: table.rows }))
        .catch(console.error);
    }
  }

  render() {
    console.log(this.state.rows);
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

//var $table = $("<table></table>").attr({ id: name });
//var $caption = $("<caption></caption>").text(name);
//var $head = $("<thead></thead>");
//var $body = $("<tbody></tbody>");
//$table.append($caption);
//$table.append($head);
//$table.append($body);
//
//for (var i = 0; i < data.length; i++) {
//  if (i === 0) {
//    var $row = $("<tr></tr>").appendTo($head);
//    for (var key in data[i]) {
//      $("<td></td>")
//        .text(key)
//        .appendTo($row);
//    }
//  }
//  var $row = $("<tr></tr>").appendTo($body);
//  for (var key in data[i]) {
//    $("<td></td>")
//      .text(JSON.stringify(data[i][key], null, 1).replace(/"/g, ""))
//      .appendTo($row);
//  }
//}
//
//$("#tableContainer").append($table);
