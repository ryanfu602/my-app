import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Menu.css";

function Menu( ) {
  return (    
    <aside className="menu app-menu ">
      <p className="menu-label app-menu-button ">QUICK LINKS</p>
      <ul className="menu-list app-menu-button ">
        <li>
          <NavLink className="app-menu-font" activeClassName="active"  to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink className="app-menu-font" activeClassName="active" to="/courses">Courses</NavLink>
        </li>
        <li>
          <NavLink className="app-menu-font" activeClassName="active"  to="/lecturers">Lecturers</NavLink>
        </li>
        <li>
          <NavLink className="app-menu-font" activeClassName="active" to="/students">Students</NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Menu;
