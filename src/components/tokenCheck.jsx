import React, { Component } from "react";
import Login from "./login";
import UserComponents from "./userComponents";

class TokenCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("Token"),
    };
  }

  handleLogin = (token) => {
    this.setState({
      ...this.state,
      token:token,
    });
    localStorage.setItem('Token', token);
  };

  render() {
    return this.state.token ? (
      <div>
        <UserComponents />
      </div>
    ) : (
      <div>
        <Login token={this.state.token} handleLogin={this.handleLogin} />
      </div>
    );
  }
}

export default TokenCheck;
