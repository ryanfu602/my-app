import React from "react";
import "./course.css";
import Menu from "../app/Menu";
function CourseList() {
  return (
    <div>
      <Menu />
    <div className="course-body">
      <h1 className="course-title">Courses</h1>
      <a className="button is-primary is-hovered course-button">
        Add new Courese
      </a>

      <div className="course-cards">
        <div className="card course-card">
          <header className="card-header">
            <p className="card-header-title course-card-bottom">Component</p>
          </header>
          <div className="card-content">
            <div className="content course-card-context">123123</div>
          </div>
          <footer className="card-footer ">
            <a href="#" className="card-footer-item course-card-bottom">
              Open
            </a>
          </footer>
        </div>

        <div className="card course-card">
          <header className="card-header">
            <p className="card-header-title course-card-bottom">Component</p>
          </header>
          <div className="card-content">
            <div className="content course-card-context">123123</div>
          </div>
          <footer className="card-footer ">
            <a href="#" className="card-footer-item course-card-bottom">
              Open
            </a>
          </footer>
        </div>

        <div className="card course-card">
          <header className="card-header">
            <p className="card-header-title course-card-bottom">Component</p>
          </header>
          <div className="card-content">
            <div className="content course-card-context">123123</div>
          </div>
          <footer className="card-footer ">
            <a href="#" className="card-footer-item course-card-bottom">
              Open
            </a>
          </footer>
        </div>

        <div className="card course-card">
          <header className="card-header">
            <p className="card-header-title course-card-bottom">Component</p>
          </header>
          <div className="card-content">
            <div className="content course-card-context">123123</div>
          </div>
          <footer className="card-footer ">
            <a href="#" className="card-footer-item course-card-bottom">
              Open
            </a>
          </footer>
        </div>
      </div>
    </div>
    </div>
  );
}

export default CourseList;
