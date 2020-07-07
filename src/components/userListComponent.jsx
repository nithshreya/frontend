import React, { Component } from "react";
import "./userListComponent.css";

// import { hashHistory } from 'react-router';
import { withRouter } from "react-router-dom";
const axios = require("axios");

class UserListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    axios
      .get("http://localhost:5000/users", {
        headers: {
          authorization: localStorage.getItem("Token"),
        },
      })
      .then((response) => {
        // handle success
        console.log(response.data);
        this.setState({ users: response.data.users });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  // handleClick = (user) => {
  //   return (event) => {
  //     console.log(user._id);
  //   };
  // };

  sayHello = (user) => {
    // alert(`hello, ${user._id}`);
    // return <Redirect to = {`/user/${user._id}`} />
    console.log(this.props);
    this.props.history.push(`/user/${user._id}`);
  };

  newUser = () => {
    this.props.history.push(`/user/new`);
  };

  render() {
    return (
      <div class="user-list">
        <div class="details">
          <div class="members">
            <b>Members</b>
          </div>
          <div class="add-member">
            <button type="button" onClick={this.newUser}>
              <b>+Add</b>
            </button>
          </div>
        </div>
        <div class="info">
          <div class="table">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Sex</th>
                  <th>Pin</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map((user, i) => {
                  // console.log({user})
                  return (
                    <tr key={i} onClick={() => this.sayHello(user)}>
                      <td>{i + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.age}</td>
                      <td>{user.sex}</td>
                      <td>{user.pin}</td>
                      <td>{user.role}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UserListComponent);
