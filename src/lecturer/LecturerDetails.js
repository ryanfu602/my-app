import React from "react";
import "./lecturer.css";
import { getValidationErrors,redirect } from "../app/AppFunc";
import Menu from "../app/Menu";
import Loading from "../app/Loading";
import Comfirm from "../app/Comfirm";
import { Link } from "react-router-dom";
import * as LecturerAPI from "./LecturerAPI";
import * as courseAPI from "../course/courseAPI";
import CourseComfirm from "../app/CourseComfirm";
import { pick } from "lodash/object";
import classnames from "classnames";
import * as yup from "yup";


const schema = yup.object().shape({
  staffNumber: yup
    .string()
    .max(50)
    .label("StaffNumber")
    .required(),
    name: yup
    .string()
    .max(50)
    .label("Name")
    .required(),
    email: yup
    .string()
    .max(200)
    .label("Email")
    .required(),
    bibliography: yup
    .string()
    .max(250)
    .label("Bibliography")
    .required(),
});




class LecturerDetails extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      Lecturer: "",
      error: "",
      deleteComfirm: false,
      saveComfire: false,
      courseList: [],
      lecturerCourese: "",
      title: "",
      coursTitle: "",
      courseComfirm: false,
      deleteCourseComfirm: false,
      addCourseflag:false,
      validationErrors: {}
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
      Lecturer: {
        ...this.state.Lecturer,
        [name]: value
      }
    });
  };

  async componentDidMount() {
    const id = this.props.match.params.id;

    if (this.isCreate()) {
      this.setState({
        Lecturer: {
          staffNumber: "",
          name: "",
          email: "",
          bibliography: ""
        }
      });
      return;
    }

    this.setState({ isLoading: true });

    try {
      const Lecturer = await LecturerAPI.getLecturerById(id);
      this.setState({ Lecturer: Lecturer });
    } catch (err) {
      console.log(err);
      this.setState({ err: err.data.error_description });
    }

    try {
      const course = await courseAPI.getCourses();
      console.log("course==", course);

      this.setState({ courseList: course });
    } catch (err) {
      console.log(err);
      this.setState({ err: err.data.error_description });
    }

    try {
      const course = await LecturerAPI.getLecturerCourse(id);
      if (course.length === 0) {
        course[0] = { title: "" };
      }

      this.setState({ lecturerCourese: course[0] });
    } catch (err) {
      console.log(err);
      this.setState({ err: err.data.error_description });
    }

    this.setState({ isLoading: false ,addCourseflag:true});
  }

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

  isCreate = () => {
    return this.props.match.params.id === "create";
  };

  handleSubmit = async e => {

    const userInput = pick(this.state.Lecturer, [
      "staffNumber",
      "name",
      "email",
      "bibliography"
    ]);

    try {
      await schema.validate(userInput, {
        abortEarly: false
      });
    } catch (err) {
      const validationErrors = getValidationErrors(err);
      this.setState({ validationErrors, isLoading: false });
      return;
    }


    const id = this.props.match.params.id;
    this.setState({ isLoading: true });
    try {
      if (this.isCreate() === true) {
        console.log("create id =", this.state.Lecturer);
        await LecturerAPI.createLecturer(this.state.Lecturer);
      } else {
        console.log(this.state.Lecturer);
        await LecturerAPI.updateLecturer(this.state.Lecturer, id);
      }
      redirect("/Lecturer");
    } catch (err) {
      console.log(err);
      this.setState({ error: err.data.message });
    }
    this.setState({ isLoading: false, saveComfirm: false });
  };

  handleDeleteSubmit = async e => {
    const id = this.props.match.params.id;
    this.setState({ isLoading: true });
    try {
      await LecturerAPI.deleteLecturer(id);
      redirect("/Lecturer");
    } catch (err) {
      this.setState({ error: err.data.message });
    }
    this.setState({ isLoading: false, deleteComfirm: false });
  };

  handleCourseSubmit = async e => {
    const id = this.props.match.params.id;
    this.setState({ isLoading: true });
    const lecturerId = this.props.match.params.id;
    const courseId = e.target.value;
    const lc = { lecturerId, courseId };

    try {
      await LecturerAPI.createLecturerCourse(lc);
    } catch (err) {
      console.log(err.data.message);
      this.setState({ error: err.data.message });
    }

    try {
      const course = await LecturerAPI.getLecturerCourse(id);
      if (course.length === 0) {
        course[0] = { title: "" };
      }

      this.setState({ lecturerCourese: course[0] });
    } catch (err) {
      console.log(err);
      this.setState({ err: err.data.message });
    }

    this.setState({ courseComfirm: false,isLoading:false });
  };
  handleDeleteCourse = async () => {
    console.log("course=====", this.state.lecturerCourese);
    const courseId = this.state.lecturerCourese.id;
    const lecturerId = this.props.match.params.id;
    this.setState({ isLoading: true });
    try {
      await LecturerAPI.deleteLecturerCourse(lecturerId, courseId);
    } catch (err) {
      console.log(err.data.message);
      this.setState({ error: err.data.message });
    }

    try {
      const course = await LecturerAPI.getLecturerCourse(lecturerId);
      if (course.length === 0) {
        course[0] = { title: "" };
      }

      this.setState({ lecturerCourese: course[0] });
    } catch (err) {
      console.log(err);
      this.setState({ err: err.data.message });
    }

    this.setState({ isLoading: false, deleteCourseComfirm: false });
  };
  handleCourse = () => {
    this.setState({ courseComfirm: true });
  };
  handleCourseCancel = () => {
    this.setState({ courseComfirm: false });
  };

  handleCancelLcDelete = () => {
    this.setState({ deleteCourseComfirm: false });
  };
  handleSubmitLcDelete = () => {
    this.setState({ deleteCourseComfirm: true });
  };

  render() {
    return (
      <div>
        <Menu />
        {this.state.isLoading && <Loading />}
        <div className="lecturer-body">
          {this.state.error && (
            <div className="lecturer-err">{this.state.error}</div>
          )}
          <h1 className="lecturer-title ">Lecturer details</h1>
          {!this.isCreate() && (
            <button
              className="button is-danger is-hovered lecturer-delete-button"
              onClick={this.handleDelete}
            >
              Delete Lecturer
            </button>
          )}
          {!this.isCreate() && !this.state.lecturerCourese.title &&this.state.addCourseflag&& (
            <button
              className="button is-primary is-hovered lecturer-delete-button"
              onClick={this.handleCourse}
            >
              Add Course
            </button>
          )}

          {!this.isCreate() && this.state.lecturerCourese.title && (
            <button
              className="button is-danger is-hovered lecturer-delete-button"
              onClick={this.handleSubmitLcDelete}
            >
              Delete Course
            </button>
          )}

          <div className="lecturer-form">
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label ">StaffNumber</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control lecturer-form-number">
                    <input
                      className={classnames("input", {
                        "is-danger": this.state.validationErrors["staffNumber"]
                      })}
                      type="text"
                      value={this.state.Lecturer.staffNumber}
                      name="staffNumber"
                      onChange={this.handleFieldChange}
                    />
                    
                  </div>
                  {this.state.validationErrors["staffNumber"] && (
                    <p className="course-validationerror">
                      {this.state.validationErrors["staffNumber"]}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label ">Name</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      className={classnames("input", {
                        "is-danger": this.state.validationErrors["name"]
                      })}
                      type="text"
                      value={this.state.Lecturer.name}
                      name="name"
                      onChange={this.handleFieldChange}
                    />
                    {this.state.validationErrors["name"] && (
                    <p className="course-validationerror">
                      {this.state.validationErrors["name"]}
                    </p>
                  )}
                  </div>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label ">Email</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      className={classnames("input", {
                        "is-danger": this.state.validationErrors["email"]
                      })}
                      type="text"
                      value={this.state.Lecturer.email}
                      name="email"
                      onChange={this.handleFieldChange}
                    />
                     {this.state.validationErrors["email"] && (
                    <p className="course-validationerror">
                      {this.state.validationErrors["email"]}
                    </p>
                  )}
                  </div>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label ">Bibliography</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                       className={classnames("input", {
                        "is-danger": this.state.validationErrors["bibliography"]
                      })}
                      type="text"
                      value={this.state.Lecturer.bibliography}
                      name="bibliography"
                      onChange={this.handleFieldChange}
                    />
                    {this.state.validationErrors["bibliography"] && (
                    <p className="course-validationerror">
                      {this.state.validationErrors["bibliography"]}
                    </p>
                  )}
                  </div>
                </div>
              </div>
            </div>
            {!this.isCreate() && (
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Course</label>
                </div>
                <div className="field-body">
                  <div className="field ">
                    <div className="control lecturer-form-title">
                      <input
                        className="input"
                        type="text"
                        value={this.state.lecturerCourese.title}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="field is-grouped is-grouped-right">
              {this.isCreate() && (
                <p className="control">
                  <button
                    className="button is-primary is-hovered "
                    onClick={this.handleSubmit}
                  >
                    Submit
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

              <p className="control">
                <Link className="button is-light" to="/Lecturer">
                  Cancel
                </Link>
              </p>
            </div>
          </div>
        </div>
        <Comfirm
          active={this.state.deleteComfirm}
          onComfire={this.handleDeleteSubmit}
          onCancel={this.handleCancelDelete}
          title="Are you sure to continue"
        >
          Are you sure you want to delete this Lecturer?
        </Comfirm>
        <Comfirm
          active={this.state.saveComfirm}
          onComfire={this.handleSubmit}
          onCancel={this.handleCancelSave}
          title="Are you sure to continue"
        >
          Are you sure you want to save this Lecturer?
        </Comfirm>
        <Comfirm
          active={this.state.deleteCourseComfirm}
          onComfire={this.handleDeleteCourse}
          onCancel={this.handleCancelLcDelete}
          title="Are you sure to continue"
        >
          Are you sure you want to delete this course?
        </Comfirm>

        <CourseComfirm
          active={this.state.courseComfirm}
          onComfire={this.handleCourseSubmit}
          onCancel={this.handleCourseCancel}
          title="Select Course"
        >
          <table className="table">
            <thead>
              <tr>
                <th width="90%" onClick={this.handleOrder}>
                  Title
                </th>
                <th width="10%" />
              </tr>
            </thead>
            <tbody>
              {this.state.courseList.map(x => (
                <tr key={x.id}>
                  <td>{x.title}</td>

                  <td>
                    <button
                      className="button is-primary is-hovered "
                      value={x.id}
                      onClick={this.handleCourseSubmit}
                    >
                      SELECT
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CourseComfirm>
      </div>
    );
  }
}
export default LecturerDetails;
