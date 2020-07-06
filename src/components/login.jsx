import React, { Component } from "react";
const axios = require("axios");
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "abhi",
      password: "abhi123",
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
    console.log(this.props)
    return (
      <div>
        <h1>Login Page</h1> <br />
        <label htmlFor="username">Enter Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={this.setUsername}
        ></input>
        <br />
        <label htmlFor="password">Enter Password:</label>
        <input
          type="text"
          id="password"
          name="password"
          onChange={this.setPassword}
        ></input>
        <br />
        <button type="button" onClick={this.doLogin}>
          Submit
        </button>
      </div>
    );
  }
}

export default Login;
