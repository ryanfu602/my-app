import React from "react";
import { HashRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import NavBar from "./NavBar";
import "./App.css";
import "./mystyles.css"


function App() {
  return (
    <Router>
      <React.Fragment>
        <NavBar />
        <Routes />
      </React.Fragment>
    </Router>
  );
}

export default App;
