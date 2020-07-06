import React, { Component } from "react";
// import { BrowserRouter, Route, Link } from "react-router-dom";

const axios = require("axios");

class UserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        age: "",
        pin: "",
        sex: "",
        role: "",
      },
      updatedUser: {},
      already: 1,
    };
  }

  saveChanges = () => {
    if (this.state.already) {
      return this.editUser();
    } else {
      return this.createUser();
    }
  };

  editUser = () => {
    axios
      .patch(
        `http://localhost:5000/users/${this.props.match.params.id}`,
        this.state.updatedUser,
        {
          headers: {
            authorization: localStorage.getItem("Token"),
          },
        }
      )
      .then((response) => {
        this.setState({ ...this.state });
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  createUser = () => {
    axios
      .post(`http://localhost:5000/users`, this.state.updatedUser)
      .then((response) => {
        this.setState({ ...this.state });
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  changeName = (e) => {
    // console.log(e.target.value);
    this.setState({
      ...this.state,
      updatedUser: { ...this.state.updatedUser, name: e.target.value },
    });
  };

  changeAge = (e) => {
    this.setState({
      ...this.state,
      updatedUser: { ...this.state.updatedUser, age: e.target.value },
    });
  };

  changePin = (e) => {
    this.setState({
      ...this.state,
      updatedUser: { ...this.state.updatedUser, pin: e.target.value },
    });
  };

  changeSex = (e) => {
    this.setState({
      ...this.state,
      updatedUser: { ...this.state.updatedUser, sex: e.target.value },
    });
  };

  changeRole = (e) => {
    this.setState({
      ...this.state,
      updatedUser: { ...this.state.updatedUser, role: e.target.value },
    });
  };

  enterUsername = (e) => {
    this.setState({
      ...this.state,
      updatedUser: { ...this.state.updatedUser, username: e.target.value },
    });
  };

  enterPassword = (e) => {
    this.setState({
      ...this.state,
      updatedUser: { ...this.state.updatedUser, password: e.target.value },
    });
  };

  componentDidMount() {
    console.log(this.props.match.params.id);
    if (!this.props.match.params.id) {
      this.setState({ ...this.state, already: 0 });
    }
    if (this.state.already == 0) {
      return;
    }
    axios
      .get(`http://localhost:5000/users/${this.props.match.params.id}`, {
        headers: {
          authorization: localStorage.getItem("Token"),
        },
      })
      .then((response) => {
        const { name, age, sex, pin, role } = response.data;
        this.setState(
          {
            user: { name, age, sex, pin, role },
          },
          () => {
            console.log(this.state.user);
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const checkExistance = () => {
      if (this.state.already) {
        return;
      } else {
        return (
          <>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              name="username"
              value={this.state.updatedUser.username || ""}
              onChange={this.enterUsername}
            ></input>
            <br />
            <label htmlFor="password">Password: </label>
            <input
              type="text"
              id="password"
              name="password"
              value={this.state.updatedUser.password || ""}
              onChange={this.enterPassword}
            ></input>
            <br />
          </>
        );
      }
    };
    return (
      <div>
        <h1>User Data</h1>
        <br />
        <label htmlFor="fname">Name: </label>
        <input
          type="text"
          id="fname"
          name="fname"
          value={this.state.updatedUser.name || this.state.user.name}
          onChange={this.changeName}
        ></input>
        <br />
        <label htmlFor="age">Age: </label>
        <input
          type="text"
          id="age"
          name="age"
          value={this.state.updatedUser.age || this.state.user.age}
          onChange={this.changeAge}
        ></input>
        <br />
        <label htmlFor="pin">Pin: </label>
        <input
          type="text"
          id="pin"
          name="pin"
          value={this.state.updatedUser.pin || this.state.user.pin}
          onChange={this.changePin}
        ></input>
        <br />
        <label htmlFor="role">Role: </label>
        <input
          type="text"
          id="role"
          name="role"
          value={this.state.updatedUser.role || this.state.user.role}
          onChange={this.changeRole}
        ></input>
        <br />
        <label htmlFor="sex">Sex: </label>
        <input
          type="text"
          id="sex"
          name="sex"
          value={this.state.updatedUser.sex || this.state.user.sex}
          onChange={this.changeSex}
        ></input>
        <br />
        {checkExistance()}
        <button type="button" onClick={this.saveChanges}>
          Save
        </button>
      </div>
    );
  }
}

export default UserComponent;
