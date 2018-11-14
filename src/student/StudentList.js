import React from "react";
import "./student.css";
import * as studentAPI from "./StudentAPI";
import Menu from "../app/Menu";
import Loading from "../app/Loading";
import {Link} from  "react-router-dom"

class StudentList extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      student: [],
      error: "",
      currentpage: 1,
      totalpage: 1
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const students = await studentAPI.getStudents(this.state.currentpage);
      console.log(students);
      console.log(students.totalPage);
      this.setState({
        student: students.students,
        totalpage: students.totalPage
      });
    } catch (err) {
      this.setState({ err: err.data.error_description });
    }
    this.setState({ isLoading: false });
  }

  handleFieldChange = async e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.setState({ isLoading: true });
    try {
      const students = await studentAPI.getStudents(value);
      console.log(students);
      console.log(students.totalPage);
      this.setState({
        student: students.students,
        totalpage: students.totalPage
      });
    } catch (err) {
      this.setState({ err: err.data.error_description });
    }
    this.setState({ isLoading: false });
  };

  handlePrevious = async e => {
    this.setState({ isLoading: true });
    this.setState({ currentpage: this.state.currentpage - 1 });
    try {
      console.log(this.state.currentpage);
      const students = await studentAPI.getStudents(this.state.currentpage - 1);
      console.log(students);
      console.log(students.totalPage);
      this.setState({
        student: students.students,
        totalpage: students.totalPage
      });
    } catch (err) {
      this.setState({ err: err.data.error_description });
    }
    this.setState({ isLoading: false });
  };

  handleNext = async e => {
    this.setState({ isLoading: true });
    this.setState({ currentpage: this.state.currentpage + 1 });
    try {
      console.log(this.state.currentpage);
      const students = await studentAPI.getStudents(this.state.currentpage + 1);
      console.log(students);
      console.log(students.totalPage);
      this.setState({
        student: students.students,
        totalpage: students.totalPage
      });
    } catch (err) {
      this.setState({ err: err.data.error_description });
    }
    this.setState({ isLoading: false });
  };

  pageList = () => {
    let pagelist = [];
    let max = this.state.totalpage;
    for (let i = 1; i <= max; i++) {
      pagelist.push(<option>{i}</option>);
    }
    return pagelist;
  };
  render() {
    return (
      <div>
        {this.state.isLogin && <Loading />}
        <Menu />
        <div className="student-body">
          <h1 className="student-title">Students</h1>
          <Link
            className="button is-primary course-button"
            to="/students/create"
          >
            Add new student
          </Link>
          <table className="table">
            <thead>
              <tr>
                <th width="25%">Name</th>
                <th width="30%">Email</th>
                <th width="10%">Gender</th>
                <th width="15%">Date of birth</th>
                <th width="10%">Credit</th>
                <th width="10%" />
              </tr>
            </thead>
            <tbody>
              {this.state.student.map(x => (
                <tr>
                  <td>{x.fullName}</td>
                  <td>{x.email}}</td>
                  <td>{x.gender}</td>
                  <td>{x.dateOfBirth}</td>
                  <td>{x.credit}</td>
                  <td>
                    <Link
                    to={`/students/${x.id}`}
                    className="button is-white"
                  >
                    Detail
                  </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav class="pagination" role="navigation" aria-label="pagination">
            <div className="field-body">
              <div className="field is-narrow">
                <div className="control">
                  <div className="select is-fullwidth ">
                    <select
                      name="currentpage"
                      value={this.state.currentpage}
                      onChange={this.handleFieldChange}
                    >
                      {this.pageList()}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {this.state.currentpage > 1 && (
              <button class="pagination-previous" onClick={this.handlePrevious}>
                Previous
              </button>
            )}
            {this.state.totalpage > this.state.currentpage && (
              <button class="pagination-next" onClick={this.handleNext}>
                Next page
              </button>
            )}
          </nav>
        </div>
      </div>
    );
  }
}

export default StudentList;
