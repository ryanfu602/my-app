import React from "react";
import "./student.css";
import { redirect } from "../app/AppFunc";
import Menu from "../app/Menu";
import Loading from "../app/Loading";
import Comfirm from "../app/Comfirm";
import { Link } from "react-router-dom";
import * as studentAPI from "./StudentAPI";
import ModernDatepicker from "react-modern-datepicker";
import moment from "moment";

class StudentDetails extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      student: "",
      error: "",
      deleteComfirm: false,
      saveComfire: false
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
          dateOfBirth:  moment(),
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

  isCreate = () => {
    return this.props.match.params.id === "create";
  };

  handleSubmit = async e => {
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

          <div className="student-form">
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label ">First Name</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      value={this.state.student.firstName}
                      name="firstName"
                      onChange={this.handleFieldChange}
                    />
                  </div>
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
                      className="input"
                      type="text"
                      value={this.state.student.lastName}
                      name="lastName"
                      onChange={this.handleFieldChange}
                    />
                  </div>
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
                      className="input"
                      type="text"
                      value={this.state.student.email}
                      name="email"
                      onChange={this.handleFieldChange}
                    />
                  </div>
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
                      className="input"
                      type="text"
                      value={this.state.student.credit}
                      name="credit"
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
      </div>
    );
  }
}
export default StudentDetails;
