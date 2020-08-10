import React, { Component } from "react";
// var FormData = require('form-data');
import "../componentsCSS/userComponent.css";
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
        image: "",
      },
      updatedUser: {},
      already: 1,
      selectedFile: null,
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
        `http://localhost:5000/api/v1/users/${this.props.match.params.id}`,
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
      .post(`http://localhost:5000/api/v1/users`, this.state.updatedUser, {
        headers: {
          authorization: localStorage.getItem("Token"),
        },
      })
      .then((response) => {
        this.setState({ ...this.state });
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  deleteUser = () => {
    axios.delete(
      `http://localhost:5000/api/v1/users/${this.props.match.params.id}`,
      {
        headers: {
          authorization: localStorage.getItem("Token"),
        },
      }
    ).then((response) => {
      this.props.history.push(`/`);
    })
  };

  onChangeHandler = (event) => {
    console.log(event.target.files[0]);
    this.setState({
      ...this.state,
      selectedFile: event.target.files[0],
      loaded: 0,
    });
    // console.log(this.state.selectedFile);
  };

  uploadImage = () => {
    const url = "http://localhost:5000/api/v1/files";
    const data = new FormData();
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    data.append("uploaded-file", this.state.selectedFile);
    for (var value of data.values()) {
      console.log(value);
    }
    axios
      .post(url, data, {
        headers: {
          authorization: localStorage.getItem("Token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((req) => {
        console.log("................");
        console.log("Req done: ", req);
        this.setState({
          ...this.state,
          updatedUser: { ...this.state.updatedUser, profilePic: req.data },
        });
      })
      .catch((err) => {
        console.log("..");
        console.error("Error: ", err);
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
    if (this.state.already === 0) {
      return;
    }
    axios
      .get(`http://localhost:5000/api/v1/users/${this.props.match.params.id}`, {
        headers: {
          authorization: localStorage.getItem("Token"),
        },
      })
      .then((response) => {
        const { name, age, sex, pin, role, image } = response.data;
        this.setState(
          {
            user: { name, age, sex, pin, role, image },
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
    console.log(this.state.user);
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
              type="password"
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
      <div className="user">
        <div className="user-data">
          <h1>User Data</h1>
        </div>
        <div className="user-info">
          <div>
            <img
              className="user-pic"
              // src={`data:image/png;base64,${this.state.user.image}`}
              src={`data:image/png;base64,${this.state.updatedUser.profilePic === undefined
                ? this.state.user.image
                : this.state.updatedUser.profilePic}`}
            />
            <label htmlFor="profile-pic">Profile Pic: </label>
            <input
              type="file"
              id="profile-pic"
              name="profile-pic"
              onChange={this.onChangeHandler}
            />
            <button type="button" id="button" onClick={this.uploadImage}>
              Upload
            </button>
          </div>
          <br />
          <div>
            <label htmlFor="fname">Name: </label>
            <input
              type="text"
              id="fname"
              name="fname"
              value={
                this.state.updatedUser.name === undefined
                  ? this.state.user.name
                  : this.state.updatedUser.name
              }
              onChange={this.changeName}
            ></input>
            <label htmlFor="age">Age: </label>
            <input
              type="text"
              id="age"
              name="age"
              value={
                this.state.updatedUser.age === undefined
                  ? this.state.user.age
                  : this.state.updatedUser.age
              }
              onChange={this.changeAge}
            ></input>
            <br />
            <label htmlFor="pin">Pin: </label>
            <input
              type="text"
              id="pin"
              name="pin"
              value={
                this.state.updatedUser.pin === undefined
                  ? this.state.user.pin
                  : this.state.updatedUser.pin
              }
              onChange={this.changePin}
            ></input>
            <br />
            <label htmlFor="role">Role: </label>
            <select
              value={
                this.state.updatedUser.role === undefined
                  ? this.state.user.role
                  : this.state.updatedUser.role
              }
              onChange={this.changeRole}
            >
              <option value="">--Please choose an option--</option>
              <option name="admin"> admin</option>
              <option name="user">user</option>
            </select>
            <br />
            <label htmlFor="sex">Sex: </label>
            {/* <div>
              <div> */}
            <input
              type="radio"
              className="sex"
              name="sex"
              value="M"
              checked={
                this.state.updatedUser.sex === undefined
                  ? this.state.user.sex === "M"
                  : this.state.updatedUser.sex === "M"
              }
              onChange={this.changeSex}
            />
            <span>Male</span>
            {/* </div>
              <div> */}
            <input
              type="radio"
              className="sex"
              name="sex"
              value="F"
              checked={
                this.state.updatedUser.sex === undefined
                  ? this.state.user.sex === "F"
                  : this.state.updatedUser.sex === "F"
              }
              onChange={this.changeSex}
            />
            <span>Female</span>
            {/* </div>
            </div> */}
            <br />
            {checkExistance()}
            <button type="button" onClick={this.saveChanges}>
              Save
            </button>
            <button type="button" onClick={this.deleteUser}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserComponent;
