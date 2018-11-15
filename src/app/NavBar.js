import React from "react";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar navbar-style" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
       <h1>LMS</h1>

        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {/* <a className="button is-primary">
                <strong>Sign up</strong>
              </a> */}
              <a className="button is-light">Log out</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
