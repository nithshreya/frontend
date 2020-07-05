import React, { Component } from "react";
// import { hashHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
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
    console.log(this.props)
    this.props.history.push(`/user/${user._id}`);
  }

  newUser = () => {
    this.props.history.push(`/user/new`);
  }

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
                <tr key={i} onClick = {() => this.sayHello(user)}>
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
        <button type="button" onClick={this.newUser}>
          NewUser
        </button>
      </div>
    );
  }
}

export default withRouter(UserListComponent);
