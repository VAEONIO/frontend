import React, { Component } from "react";
import "./Error.css";

class Error extends Component {
  render() {
    return (
      <div className="row">
        <pre className="u-full-width">
          <code className="u-full-width">{this.props.message}</code>
        </pre>
      </div>
    );
  }
}

export default Error;
