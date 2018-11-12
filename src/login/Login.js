import React from "react";
import "./login.css"
function Login() {
  return (
    <div className="login-style">
      <div>
        <h1 className="login-title">Login LMS</h1>
        </div>
        <div>
        <h2 className="login-subtitle">Please login to proceed.</h2>
      </div>
      <div className="login-form">
        <div className="field">
          <p className="control has-icons-left">
            <input className="input" type="email" placeholder="Enter username" />
            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input className="input" type="password" placeholder="Password" />
            <span className="icon is-small is-left">
              <i className="fas fa-lock" />
            </span>
          </p>
        </div>
        <div className="field is-grouped is-grouped-centered">
          <p className="control">
            <button className="button is-primary ">Login</button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
