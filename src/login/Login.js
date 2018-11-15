import React from "react";
import "./login.css";
import getToken from "./LoginAPI";
import { redirect } from "../app/AppFunc";
import axios from "axios";
import Loading from "../app/Loading";
class Login extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      isLogin: false,
      validationErrors: {},
      loginError: ""
    };
  }

  handleFieldChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    try {
      this.setState({ validationErrors: {}, isLogin: true });
      const response = await getToken(this.state.username, this.state.password);
      this.setState({ loginError: "", isLogin: false });

      console.log(response.access_token);
      axios.defaults.headers.common.Authorization = `Bearer ${
        response.access_token
      }`;

      localStorage.setItem("access_token", response.access_token);
      redirect("/");
    } catch (err) {
      this.setState({ loginError: err.data.error_description, isLogin: false });
    }
  };

  render() {
    return (
      <div>
        {this.state.isLogin && <Loading />}
        <div className="login-style">
          <div>
            <h1 className="login-title">Login LMS</h1>
          </div>
          <div>
            <h2 className="login-subtitle">Please login to proceed.</h2>
          </div>

          <div className="login-form">
            {this.state.loginError && (
              <div className="login-err">{this.state.loginError}</div>
            )}
            <div className="field">
              <p className="control has-icons-left">
                <input
                  name="username"
                  className="input"
                  type="text"
                  placeholder="Enter username"
                  onChange={this.handleFieldChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user" />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  name="password"
                  className="input"
                  type="password"
                  placeholder="Password"
                  onChange={this.handleFieldChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock" />
                </span>
              </p>
            </div>
            <div className="field is-grouped is-grouped-centered">
              <p className="control">
                <input
                  className="button is-primary"
                  type="submit"
                  value="Login"
                  onClick={this.handleSubmit}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
