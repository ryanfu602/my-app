import React from "react";
import "./student.css";
import { getValidationErrors, redirect } from "../app/AppFunc";
import Menu from "../app/Menu";
import Loading from "../app/Loading";
import CourseComfirm from "../app/CourseComfirm";
import Comfirm from "../app/Comfirm";
import { Link } from "react-router-dom";
import * as studentAPI from "./StudentAPI";
import ModernDatepicker from "react-modern-datepicker";
import moment from "moment";
import * as courseAPI from "../course/courseAPI";
import { pick } from "lodash/object";
import classnames from "classnames";
import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .max(50)
    .label("First name")
    .required(),
  lastName: yup
    .string()
    .max(50)
    .label("Last name")
    .required(),
  gender: yup
    .string()
    .label("Gender")
    .required(),
  dateOfBirth: yup
    .string()
    .label("Date of birth")
    .required(),
  email: yup
    .string()
    .label("Email")
    .required(),
  credit: yup
    .number()
    .positive()
    .label("Credit")
    .required()
});

class StudentDetails extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      student: "",
      course: [],
      courseList: [],
      newList: [],
      error: "",
      deleteComfirm: false,
      saveComfire: false,
      courseComfire: false,
      validationErrors: {}
    };
  }
  isCreate = () => {
    return this.props.match.params.id === "create";
  };

  getName = fullname => {
    return fullname.split(" ");
  };

  getFirstName = fullname => {
    const nameArray = fullname.split(" ");
    return nameArray[0];
  };
  getDateOfBirth = date => {
    // return date.substr(0, 10);
    return date;
  };

  handleFieldChange = e => {
    const {
      target,
      target: { name }
    } = e;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      student: {
        ...this.state.student,
        [name]: value
      }
    });
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    if (this.isCreate()) {
      this.setState({
        student: {
          firstName: "",
          lastName: "",
          gender: "M",
          dateOfBirth: moment(),
          email: "",
          credit: ""
        }
      });
      return;
    }

    this.setState({ isLoading: true });
    try {
      const student = await studentAPI.getStudentById(id);
      console.log(student.fullName);
      // const name = this.getName(student.fullName);
      const dateOfBirth = this.getDateOfBirth(student.dateOfBirth);

      this.setState({
        student: {
          ...student,
          // firstName: name[0],
          // lastName: name[1],
          dateOfBirth: dateOfBirth
        }
      });
    } catch (err) {
      console.log(err);
      this.setState({ err: err.data.error_description });
    }

    try {
      const course = await courseAPI.getCourses();

      const courseSelectd = { ...course, selectd: false };

      console.log("courseSelectd", courseSelectd);

      this.setState({ courseList: course });
      console.log(course);
    } catch (err) {
      console.log(err);
      this.setState({ err: err.data.error_description });
    }

    this.setState({ isLoading: false });
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

  handleCourse = async () => {
    console.log("courselist=", this.state.courseList);
    console.log("course=", this.state.course);

    const copy = [];
    let selectd = false;
    let studentCourseId = 0;
    const id = this.props.match.params.id;

    try {
      const studentcourse = await studentAPI.getStudentCourses(id);

      this.setState({ course: studentcourse });

      console.log("1 ,2= ", this.state.courseList.length, studentcourse.length);
      for (let i = 0; i < this.state.courseList.length; i++) {
        selectd = false;
        studentCourseId = 0;
        for (let j = 0; j < studentcourse.length; j++) {
          if (this.state.courseList[i].id === studentcourse[j].courseId) {
            console.log("studentcourse,j=", j, studentcourse[j]);
            studentCourseId = studentcourse[j].id;
            console.log("studentCourseId,j=", studentCourseId);
            selectd = true;
          }
        }
        const newlist = {
          ...this.state.courseList[i],
          selectd: selectd,
          studentCourseId: studentCourseId
        };
        console.log("newlist=", newlist);
        copy.push(newlist);
      }
    } catch (err) {
      console.log(err);
      this.setState({ err: err.data.error_description });
    }

    console.log("copy=", copy);

    this.setState({ courseComfirm: true, newList: copy });
  };
  handleCourseCancel = () => {
    this.setState({ courseComfirm: false });
  };

  isCreate = () => {
    return this.props.match.params.id === "create";
  };

  handleSubmit = async e => {
    const userInput = pick(this.state.student, [
      "firstName",
      "lastName",
      "gender",
      "dateOfBirth",
      "email",
      "credit"
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
        console.log("create id =", this.state.student);
        await studentAPI.createStudent(this.state.student);
      } else {
        console.log(this.state.student);
        await studentAPI.updateStudent(this.state.student, id);
      }
      redirect("/student");
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
      await studentAPI.deleteStudent(id);
      redirect("/student");
    } catch (err) {
      this.setState({ error: err.data.message });
    }
    this.setState({ isLoading: false, deleTteComfirm: false });
  };

  handleChange = date => {
    this.setState({
      student: {
        ...this.state.student,
        dateOfBirth: date
      }
    });
  };

  handleCourseSubmit = async e => {
    const sc = {
      studentId: this.props.match.params.id,
      courseId: e.target.value
    };
    console.log("sc", sc);

    this.setState({ isLoading: true });
    try {
      await studentAPI.createStudentCourse(sc);
    } catch (err) {
      console.log(err);
      this.setState({ error: err.data.message });
    }
    this.setState({ isLoading: false, courseComfirm: false });
  };

  handleCourseDelete = async e => {
    const id = e.target.value;
    console.log("id", id);

    this.setState({ isLoading: true });
    try {
      await studentAPI.deleteStudentCourses(id);
    } catch (err) {
      console.log(err);
      this.setState({ error: err.data.message });
    }
    this.setState({ isLoading: false, courseComfirm: false });
  };

  render() {
    return (
      <div>
        <Menu />
        {this.state.isLoading && <Loading />}
        <div className="student-body">
          {this.state.error && (
            <div className="course-err">{this.state.error}</div>
          )}
          <h1 className="student-title ">Student details</h1>
          {!this.isCreate() && (
            <button
              className="button is-danger is-hovered student-delete-button"
              onClick={this.handleDelete}
            >
              Delete student
            </button>
          )}
          {!this.isCreate() && (
            <button
              className="button is-primary is-hovered student-delete-button"
              onClick={this.handleCourse}
            >
              Add Course
            </button>
          )}

          <div className="student-form">
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label ">First Name</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      className={classnames("input", {
                        "is-danger": this.state.validationErrors["firstName"]
                      })}
                      type="text"
                      value={this.state.student.firstName}
                      name="firstName"
                      onChange={this.handleFieldChange}
                    />
                  </div>
                  {this.state.validationErrors["firstName"] && (
                    <p className="course-validationerror">
                      {this.state.validationErrors["firstName"]}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label ">Last name</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      className={classnames("input", {
                        "is-danger": this.state.validationErrors["lastName"]
                      })}
                      type="text"
                      value={this.state.student.lastName}
                      name="lastName"
                      onChange={this.handleFieldChange}
                    />
                  </div>
                  {this.state.validationErrors["lastName"] && (
                    <p className="course-validationerror">
                      {this.state.validationErrors["lastName"]}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Gender</label>
              </div>
              <div className="field-body">
                <div className="field is-narrow">
                  <div className="control student-form-credit">
                    <div className="select is-fullwidth ">
                      <select
                        value={this.state.student.gender}
                        name="gender"
                        onChange={this.handleFieldChange}
                      >
                        <option>M</option>
                        <option>F</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label ">Date of birth</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control student-form-date">
                    <ModernDatepicker
                      date={this.state.student.dateOfBirth}
                      format={"YYYY-MM-DD"}
                      className="color"
                      onChange={date => this.handleChange(date)}
                      placeholder={"Select a date"}
                    />
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
                      value={this.state.student.email}
                      name="email"
                      onChange={this.handleFieldChange}
                    />
                  </div>
                  {this.state.validationErrors["email"] && (
                    <p className="course-validationerror">
                      {this.state.validationErrors["email"]}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label ">credit</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control ">
                    <input
                      className={classnames("input", {
                        "is-danger": this.state.validationErrors["credit"]
                      })}
                      type="text"
                      value={this.state.student.credit}
                      name="credit"
                      onChange={this.handleFieldChange}
                    />
                  </div>
                  {this.state.validationErrors["credit"] && (
                    <p className="course-validationerror">
                      {this.state.validationErrors["credit"]}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Credit</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control student-form-credit">
                    <input
                      className={classnames("input", {
                        "is-danger": this.state.validationErrors["credit"]
                      })}
                      type="text"
                      value={this.state.student.credit}
                      name="credit"
                      onChange={this.handleFieldChange}
                    />
                  </div>
                </div>
                {this.state.validationErrors["credit"] && (
                  <p className="course-validationerror">
                    {this.state.validationErrors["credit"]}
                  </p>
                )}
              </div>
            </div>

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
                <Link className="button is-light" to="/student">
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
          Are you sure you want to delete this student?
        </Comfirm>
        <Comfirm
          active={this.state.saveComfirm}
          onComfire={this.handleSubmit}
          onCancel={this.handleCancelSave}
          title="Are you sure to continue"
        >
          Are you sure you want to save this student?
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
                <th width="50%" onClick={this.handleOrder}>
                  Title
                </th>
                <th width="40%">Status</th>
                <th width="10%" />
                
              </tr>
            </thead>
            <tbody>
              {this.state.newList.map(x => (
                <tr key={x.id}>
                
  
                  <td>{x.title}</td>
                  {x.selectd === false&&<td>Non-enrolled</td>}
                  {x.selectd === true&&<td>Enrolled</td>}
            
                  {x.selectd === false && (
                
                    <td>
                      <button
                        className="button is-primary is-hovered "
                        value={x.id}
                        onClick={this.handleCourseSubmit}
                      >
                        SELECT
                      </button>
                    </td>
                  )}
                  
                   
                  {x.selectd === true && (
                    <td>
                      <button
                        className="button is-danger is-hovered "
                        value={x.studentCourseId}
                        onClick={this.handleCourseDelete}
                      >
                        DELETE
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </CourseComfirm>
      </div>
    );
  }
}
export default StudentDetails;
