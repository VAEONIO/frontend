import React, { Component } from "react";

class Arg extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div className="arg">
        <label>{this.props.name}</label>
        <input
          className="u-full-width"
          type="text"
          value={this.props.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }

  handleChange(event) {
    this.props.onChange(this.props.index, event.target.value);
  }
}

class Action extends Component {
  render() {
    return (
      <div className="actionInputContainer">
        {this.props.args.map((arg, i) => (
          <Arg
            key={i}
            name={arg.name}
            value={this.props.values[i]}
            index={i}
            onChange={this.props.onArgChange}
          />
        ))}
      </div>
    );
  }
}

export default Action;
