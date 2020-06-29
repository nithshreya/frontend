import React, { Component } from "react";
const axios = require("axios");

class UserComponents extends Component {
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

  handleClick = (user) => {
    return (event) => {
      console.log(event.target, user);
    };
  };

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>name</th>
              <th>age</th>
              <th>sex</th>
              <th>pin</th>
              <th>role</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user, i) => {
              // console.log({user})
              return (
                <tr onClick={this.handleClick(user)} key={i}>
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
    );
  }
}

export default UserComponents;
