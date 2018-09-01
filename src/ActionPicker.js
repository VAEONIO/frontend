import React, { Component } from "react";

class ActionPicker extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div>
        <label htmlFor="actions">Available Actions</label>
        <select
          id="actions"
          className="u-full-width"
          value={this.props.index}
          onChange={this.handleChange}
        >
          {this.props.actions.map((action, i) => (
            <option key={i} value={i}>
              {action.description}
            </option>
          ))}
        </select>
      </div>
    );
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }
}

export default ActionPicker;
