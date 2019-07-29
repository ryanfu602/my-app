import React from "react";
import "./Dashboard.css";
import { NavLink } from "react-router-dom";
import Menu from "../app/Menu";


export default function Dashboard() {
  return ( 
    <div>
      <Menu />
    <div className="DASHBOARD--BODY">
      <p className="DASHBOARD--TITLE">Welcome to LMS</p>
      <div className="tile is-ancestor">
        <div className="tile is-parent ">
          <article className="DASHBOARD--ART tile is-child notification is-primary">
            <p className="title">Courses</p>
            <p className="subtitle">
              All kinds of courses needed for IT industry
            </p>
            <NavLink className="button is-primary is-inverted is-outlined dashboard-button" to="/course/create">
              Add new course
            </NavLink>
            <NavLink className="button is-primary is-inverted is-outlined dashboard-button" to="/course">
              All course
            </NavLink>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="DASHBOARD--ART tile is-child notification is-warning">
            <p className="title">Lecturers</p>
            <p className="subtitle">Best lecturers in IT world</p>
            <NavLink className="button is-primary is-inverted is-outlined dashboard-button" to="/lecturer/create">
              Add new lecture
            </NavLink>
            <NavLink className="button is-primary is-inverted is-outlined dashboard-button" to="/lecturer">
              All lecture
            </NavLink>
          </article>
        </div>
      </div>
      <div className="tile is-ancestor">
        <div className="tile is-parent is-6">
          <article className="DASHBOARD--ART tile is-child notification is-info">
            <p className="title">Students</p>
            <p className="subtitle">Hard-working and smart students</p>
            <NavLink className="button is-primary is-inverted is-outlined dashboard-button" to="/student/create">
              Add new student
            </NavLink>
            <NavLink className="button is-primary is-inverted is-outlined dashboard-button" to="/student">
              All student
            </NavLink>

          </article>
        </div>
      </div>
    </div>
    </div>
  );
}
