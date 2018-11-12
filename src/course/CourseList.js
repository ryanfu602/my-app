import React from "react";
import "./course.css";
import Menu from "../app/Menu";
import * as courseAPI from "./courseAPI";
import {Link} from "react-router-dom";
class CourseList extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      course: [],
      error: ""
    };
  }

  
  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const courses = await courseAPI.getCourses();

      console.log(courses);
      this.setState({ course: courses });
    } catch (err) {
      this.setState({ err: err.data.error_description });
    }
    this.setState({ isLoading: false });
  }
  render() {
    return (
      <div>
        <Menu />
        <div className="course-body">
          <h1 className="course-title">Courses</h1>
          <a className="button is-primary is-hovered course-button">
            Add new Courese
          </a>
          <div className="course-cards">
            {this.state.course.map(x => (
              <div className="card course-card" key={x.id}>
                <header className="card-header">
                  <p className="card-header-title course-card-bottom">
                    {x.title}
                  </p>
                </header>
                <div className="card-content">
                  <div className="content course-card-context">
                    {x.description}}
                  </div>
                </div>
                <footer className="card-footer ">
        
                  <Link
                    to={`/courses/${x.id}`}
                    className="card-footer-item course-card-bottom"
                  >
                    Open
                  </Link>
                </footer>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default CourseList;
