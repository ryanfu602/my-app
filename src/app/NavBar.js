import React from "react";
import "./NavBar.css";
import {redirect} from "./AppFunc"
import axios from "axios";

function handleLogOut() {

    axios.defaults.headers.common.Authorization = "";
    localStorage.setItem("access_token","");  
    redirect("/Login");
}

function NavBar() {
  return (
    <nav
      className="navbar navbar-style"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <h1>LMS</h1>
        <p
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </p>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button className="button is-light" onClick={handleLogOut}>
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
