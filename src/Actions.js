import React, { Component } from "react";
import Action from "./Action";
import ActionPicker from "./ActionPicker";
//import ActionExecutor from "./ActionExecutor";

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

class Actions extends Component {
  constructor(props) {
    super(props);
    this.actions = [
      new A(
        "vaeonxxvaeon",
        "createprof",
        [
          new Arg("account", this.props.account.name),
          new Arg("first_name", { value: "John", price: 0 }),
          new Arg("last_name", { value: "Doe", price: 0 }),
          new Arg("string_fields", [{ name: "Age", value: "HASH", price: 10 }])
        ],
        "create profile"
      ),
      new A(
        "vaeonxxvaeon",
        "updateprof",
        [
          new Arg("account", this.props.account.name),
          new Arg("first_name", { value: "Jack", price: 0 }),
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
        [new Arg("account_name", this.props.account.name)],
        "remove profile"
      )
    ];
    this.state = {
      action: this.actions[0],
      args: this.actions[0].args.map(arg => JSON.stringify(arg.value, null, 1))
    };
    this.handleActionChange = this.handleActionChange.bind(this);
    this.handleArgChange = this.handleArgChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
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
              actions={this.actions}
              onChange={this.handleActionChange}
            />
            <input
              className="button-primary u-full-width"
              type="submit"
              value="Execute"
            />
          </div>
        </form>
      </div>
    );
  }

  handleActionChange(index) {
    this.setState(prevState => {
      return {
        index: index,
        action: this.actions[index],
        args: this.actions[index].args.map(arg =>
          JSON.stringify(arg.value, null, 1)
        )
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

  handleSubmit(event) {
    event.preventDefault();
    this.props.eos.contract(this.state.action.contract).then(contract => {
      const args = this.state.args.map(JSON.parse);
      args.push({
        authorization: [
          `${this.props.account.name}@${this.props.account.authority}`
        ]
      });
      contract[this.state.action.name](...args);
    });
  }
}

export default Actions;
