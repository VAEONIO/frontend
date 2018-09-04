import React, { Component } from "react";
import "./Login.css";
import Video from "./Video";
import VaeonLogo from "./VaeonLogo";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVideo: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVideo = this.handleVideo.bind(this);
  }

  render() {
    return (
      <div className="Login">
        <VaeonLogo />
        {this.props.noScatter && (
          <pre>
            <code>
              It looks like you do not have Scatter installed. Get it{" "}
              <a href="https://get-scatter.com/" target="_blank">
                here
              </a>.
            </code>
          </pre>
        )}
        <div className="Login-buttons">
          {!this.props.noScatter && (
            <form onSubmit={this.handleSubmit}>
              <input type="submit" value="login with scatter" />
            </form>
          )}
          <form onSubmit={this.handleVideo}>
            <input type="submit" value="or watch the video" />
          </form>
        </div>
        {this.state.showVideo && <Video />}
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onLogin();
  }

  handleVideo(event) {
    event.preventDefault();
    this.setState({ showVideo: true });
  }
}

export default Login;
