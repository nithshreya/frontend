import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./login";
import UserListComponent from "./userListComponent";
import UserComponent from "./userComponent"

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
      token: token,
    });
    localStorage.setItem("Token", token);
  };

  render() {
    return this.state.token ? (
      <div>
        {/* <UserListComponent /> */}
        <Router>
          <Switch>
            <Route exact path="/">
              <UserListComponent />
            </Route>
            <Route path="/user/new" component={UserComponent} />
            {/* <Route path="/user/:id">
              <UserComponent />
            </Route> */}
            <Route path="/user/:id" component={UserComponent} />
          </Switch>
        </Router>
      </div>
    ) : (
      <div>
        <Login token={this.state.token} handleLogin={this.handleLogin} />
      </div>
    );
  }
}

export default TokenCheck;
