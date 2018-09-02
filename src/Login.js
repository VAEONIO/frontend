import React, { Component } from "react";
import "./Login.css";

const network = {
  blockchain: "eos",
  host: "user-api.eoseoul.io",
  port: 80,
  protocol: "http",
  chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="Login">
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 529.35 72"
          className="Login-logo"
        >
          <defs>
            <style>
              .cls-1{"{"}fill-rule:evenodd;{"}"}
            </style>
          </defs>
          <title>VAEON logo</title>
          <path
            className="cls-1"
            d="M129.88,104.76,152.4,87,175,104.76l-22.56,18.4Zm32.45,0-9.91-7.2-10,7.17,10,7.79Z"
            transform="translate(-129.88 -87)"
          />
          <polygon points="36.1 53.31 36.09 72 45.06 64.6 45.07 45.91 36.1 53.31" />
          <polygon points="8.97 53.31 8.99 72 0.01 64.6 0 45.91 8.97 53.31" />
          <polygon points="22.54 45.1 0 26.46 0 37.23 22.52 55.84 45.07 37.25 45.07 26.46 22.54 45.1" />
          <polygon points="109.64 67.99 83.16 4.01 92.92 4.01 114.83 60.59 136.84 4.01 146.6 4.01 120.12 67.99 109.64 67.99" />
          <path
            d="M534.85,155c-21.78,0-31.53-15.89-31.53-31.63,0-15.59,9.87-32.37,31.53-32.37,9.06,0,16.81,3,22.42,8.67,5.83,5.9,9.12,14.5,9,23.58C566.11,139.05,556.32,155,534.85,155Zm0-57c-6.74,0-12.51,2.27-16.69,6.56-4.58,4.69-7.1,11.64-6.91,19,.31,11.75,6.67,24.3,23.6,24.3s23.31-13.15,23.51-24.41c.12-7.48-2.42-14.44-7-19.07C547.19,100.16,541.63,98,534.85,98Z"
            transform="translate(-129.88 -87)"
          />
          <polygon points="524.5 68 485.57 18.06 485.57 68 476.94 68 476.94 4.12 484.23 4.12 520.72 50.29 520.72 4.02 529.35 4.02 529.35 68 524.5 68" />
          <polygon points="235.91 68 210.96 11 185.91 68 176.62 68 205.31 4.03 216.61 4.03 245.3 68 235.91 68" />
          <rect x="285.2" y="59.55" width="46.83" height="8.45" />
          <rect x="285.2" y="32.18" width="44.49" height="7.77" />
          <rect x="285.2" y="4.02" width="46.83" height="8.26" />
        </svg>
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="Login with Scatter" />
        </form>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onLogin();
  }
}

export default Login;
