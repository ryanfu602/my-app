import React from "react";
import "./course.css";
import Menu from "../app/Menu";
import Loading from "../app/Loading";
import Comfirm from "../app/Comfirm";
import { Link } from "react-router-dom";
import * as courseAPI from "./courseAPI";
import { redirect } from "../app/AppFunc";

class CourseDetails extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      course: "",
      error: "",
      saveComfirm: false,
      deleteComfirm:false
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
  handleDelete = () => {
    this.setState({ deleteComfirm: true });
  };
  handleCancelDelete = () => {
    this.setState({ deleteComfirm: false });
  };

  handleSave = () => {
    this.setState({ saveComfirm: true });
  };
  handleCancelSave = () => {
    this.setState({ saveComfirm: false });
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    if (this.isCreate()) {
      this.setState({ course: { title: "", fee:"", description: "",maxStudent:10 } });
      return;
    }
    this.setState({ isLoading: true });
    try {
      const course = await courseAPI.getCourseById(id);

      this.setState({ course: course });
    } catch (err) {
      this.setState({ err: err.data.error_description });
    }
    this.setState({ isLoading: false });
  }

  handleSubmit = async e => {
    const id = this.props.match.params.id;
    this.setState({ isLoading: true });
    try {
      if (this.isCreate() === true) {
        console.log("create id =", id);
        await courseAPI.createCourse(this.state.course);
      } else {
        console.log("select id =", id);
        await courseAPI.updateCourse(this.state.course, id);
      }
      redirect("/course");
    } catch (err) {
      this.setState({ error: err.data.message });
    }
    this.setState({ isLoading: false, saveComfirm: false });
  };

  handleDeleteSubmit = async e => {
    this.setState({ comfirm: false });
    const id = this.props.match.params.id;
    this.setState({ isLoading: true });
    try {
      await courseAPI.deleteCourse(id);
      redirect("/course");
    } catch (err) {
      this.setState({ error: err.data.message });
    }
    this.setState({ isLoading: false, deleteComfirm: false });
  };

  render() {
    return (
      <div>
        <Menu />
        {this.state.isLoading && <Loading />}
        <div className="course-body">
          <h1 className="course-title ">Course details</h1>
          {this.state.error && (
            <div className="course-err">{this.state.error}</div>
          )}
          {!this.isCreate() && (
            <button
              className="button is-danger is-hovered course-delete-button"
              onClick={this.handleDelete}
            >
              Delete course
            </button>
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
                <label className="label">Language</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control course-form-fee">
                    <input
                      name="language"
                      className="input"
                      type="text"
                      value={this.state.course.language}
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
                  <button
                    className="button is-primary is-hovered "
                    onClick={this.handleSubmit}
                  >
                    Create
                  </button>
                </p>
              )}
              {!this.isCreate() && (
                <p className="control">
                  <button
                    className="button is-primary is-hovered "
                    onClick={this.handleSave}
                  >
                    Save
                  </button>
                </p>
              )}
              <Link className="button is-light course-decoration" to="/course">
                Cancel
              </Link>
            </div>
          </div>
        </div>
        <Comfirm
          active={this.state.deleteComfirm}
          onComfire={this.handleDeleteSubmit}
          onCancel={this.handleCancelDelete}
          title="Are you sure to continue"
        >
          Are you sure you want to delete this course?
        </Comfirm>

        <Comfirm
          active={this.state.saveComfirm}
          onComfire={this.handleSubmit}
          onCancel={this.handleCancelSave}
          title="Are you sure to continue"
        >
          Are you sure you want to save this course?
        </Comfirm>
      </div>
    );
  }
}

export default CourseDetails;
