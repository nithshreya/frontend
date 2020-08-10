import React, { Component } from "react";
import "../componentsCSS/userListComponent.css";
import defaultIcon from "./defaultIcon.jpg";

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
      .get("http://localhost:5000/api/v1/users", {
        headers: {
          authorization: localStorage.getItem("Token"),
        },
      })
      .then((response) => {
        // handle success
        console.log(response.data);
        this.setState({ users: response.data.users }, () =>
          console.log("image" in this.state.users)
        );
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
      <div className="user-list">
        <div className="details">
          <div className="members">
            <b>Members</b>
          </div>
          <div className="add-member">
            <button type="button" onClick={this.newUser}>
              <b>+Add</b>
            </button>
          </div>
        </div>
        <div className="info">
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>pic</th>
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
                      {/* <td><img className='profile-pic' src={`data:image/png;base64,${user.image}`}/></td> */}
                      {"image" in user ? (
                        <td>
                          <img
                            className="profile-pic"
                            src={`data:image/png;base64,${user.image}`}
                          />
                        </td>
                      ) : (
                        <td>
                          <img className="profile-pic" src={defaultIcon} />
                        </td>
                      )}
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
