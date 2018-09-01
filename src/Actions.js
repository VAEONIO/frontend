import React, { Component } from "react";
import Action from "./Action";
import ActionPicker from "./ActionPicker";

class Arg {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

class A {
  constructor(contract, name, args, description) {
    this.contract = contract;
    this.name = name;
    this.args = args;
    this.description = description;
  }
}

const actions = [
  new A(
    "vaeonxxvaeon",
    "updateprof",
    [
      new Arg("account", "flo"),
      new Arg("first_name", { value: "Florian", price: 0 }),
      new Arg("last_name", { value: "HASH2", price: 5 }),
      new Arg("string_fields", [
        { name: "University", value: "HASH", price: 20 }
      ])
    ],
    "update profile"
  ),
  new A(
    "vaeonxxvaeon",
    "removeprof",
    [new Arg("account_name", "flo")],
    "remove profile"
  )
];

class Actions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: actions[0],
      args: actions[0].args.map(arg => JSON.stringify(arg.value, null, 1))
    };
    this.handleActionChange = this.handleActionChange.bind(this);
    this.handleArgChange = this.handleArgChange.bind(this);
  }

  render() {
    return (
      <div className="Actions">
        <div className="six columns">
          <Action
            eos={this.props.eos}
            contract={this.state.action.contract}
            name={this.state.action.name}
            args={this.state.action.args}
            values={this.state.args}
            onArgChange={this.handleArgChange.bind(this)}
            description={this.state.action.description}
          />
        </div>
        <div className="six columns">
          <ActionPicker
            index={this.state.index}
            actions={actions}
            onChange={this.handleActionChange}
          />
        </div>
      </div>
    );
  }
  //<input className="button-primary" form="action" type="submit" value="Execute">

  handleActionChange(index) {
    console.log(index);
    this.setState(prevState => {
      return {
        index: index,
        action: actions[index],
        args: actions[index].args.map(arg => JSON.stringify(arg.value, null, 1))
      };
    });
  }

  handleArgChange(index, value) {
    this.setState(prevState => {
      const args = prevState.args;
      args[index] = value;
      return { args: args };
    });
  }
}

export default Actions;
