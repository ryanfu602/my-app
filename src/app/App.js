import React from "react";
import { HashRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import NavBar from "./NavBar";
import Menu from "./Menu";
import "./App.css";
import "./mystyles.css"
// import "../../mybulma/css/mystyles.css";

function App() {
  return (
    <Router>
      <React.Fragment>
        <NavBar />
        <Menu />
        <Routes />
      </React.Fragment>
    </Router>
  );
}

export default App;
