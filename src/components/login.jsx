import React, { Component } from "react";
import "./login.css";
const axios = require("axios");
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  doLogin = () => {
    axios
      .post("http://localhost:5000/users/login", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((response) => {
        this.props.handleLogin(response.data.token);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  setUsername = (e) => {
    // console.log(e.target.value);
    this.setState({
      ...this.state,
      username: e.target.value,
    });
  };

  setPassword = (e) => {
    this.setState({
      ...this.state,
      password: e.target.value,
    });
  };

  //   componentDidMount(){    console.log('--------------------')

  //   }
  render() {
    console.log(this.props);
    return (
      <div class="login-page">
        <div class="1">Welcome!</div>
        <div class="form">
          <div class="n1">
            <h2>
              <b>Login</b>
            </h2>
          </div>
          <div class="n2">
            <label htmlFor="username">
              <strong>Username</strong>
            </label>
            <br />
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username"
              onChange={this.setUsername}
              required
            ></input>
            <br />
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              onChange={this.setPassword}
              required
            ></input>
            <br />
          </div>
          <div class="login-button">
            <button id="button" onClick={this.doLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
