import React from "react";
import "./course.css";
import Menu from "../app/Menu";
import Comfirm from "../app/Comfirm";
import * as courseAPI from "./courseAPI";

class CourseDetails extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      course: "",
      error: ""
    };
  }

  isCreate = () => {
    return this.props.match.params.id === "create";
  };

  handleFieldChange = e => {
    const {
      target,
      target: { name }
    } = e;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      course: {
        ...this.state.course,
        [name]: value
      }
    });
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    if (this.isCreate()) {
      this.setState({ course: { title: "", fee: "", description: "" } });
      return;
    }
    this.setState({ isLoading: true });
    try {
      const course = await courseAPI.getCourseById(id);

      console.log(course);
      this.setState({ course: course });
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
          <h1 className="course-title ">Course details</h1>
          {!this.isCreate && (
            <a className="button is-danger is-hovered course-delete-button">
              Delete course
            </a>
          )}
          <div className="course-form">
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label ">Title</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      name="title"
                      className="input"
                      type="text"
                      value={this.state.course.title}
                      onChange={this.handleFieldChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Fee</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control course-form-fee">
                    <input
                      name="fee"
                      className="input"
                      type="text"
                      value={this.state.course.fee}
                      onChange={this.handleFieldChange}
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Max students</label>
              </div>
              <div className="field-body">
                <div className="field is-narrow">
                  <div className="control course-form-maxstudent">
                    <div className="select is-fullwidth ">
                      <select
                        name="maxStudent"
                        value={this.state.course.maxStudent}
                        onChange={this.handleFieldChange}
                      >
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                        <option>40</option>
                        <option>50</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Description</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <textarea
                      name="description"
                      className="textarea"
                      value={this.state.course.description}
                      onChange={this.handleFieldChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="field is-grouped is-grouped-right">
              {this.isCreate() && (
                <p className="control">
                  <a className="button is-primary is-hovered ">Create</a>
                </p>
              )}
              {!this.isCreate() && (
                <p className="control">
                  <a className="button is-primary is-hovered ">Save</a>
                </p>
              )}
              <p className="control">
                <a className="button is-light">Cancel</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseDetails;
