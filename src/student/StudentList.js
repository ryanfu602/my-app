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
      totalpage: 1,
      sortOrder:"asc",
      sortString:"id"
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const students = await studentAPI.getStudents(this.state.currentpage,this.state.sortOrder,this.state.sortString);
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
      const students = await studentAPI.getStudents(value,this.state.sortOrder,this.state.sortString);
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
      const students = await studentAPI.getStudents(this.state.currentpage - 1,this.state.sortOrder,this.state.sortString);
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
      const students = await studentAPI.getStudents(this.state.currentpage + 1,this.state.sortOrder,this.state.sortString);
      console.log(students);
      console.log(students.totalPage);
      this.setState({
        student: students.students,
        totalpage: students.totalPage
      });
    } catch (err) {
      // this.setState({ err: err.data.error_description });
      console.log( err);
    }
    this.setState({ isLoading: false });
  };

  pageList = () => {
    let pagelist = [];
    let max = this.state.totalpage;
    for (let i = 1; i <= max; i++) {
      pagelist.push(<option key={i}>{i}</option>);
    }
    return pagelist;
  };


  handleOrder=async e=>{


    const sortstring = e.target.innerHTML.toLowerCase();
    let order = "asc"
    console.log( "this.state.sortString=",this.state.sortString);
    console.log( "this.state.sortOrder=",this.state.sortOrder);
    if( sortstring === this.state.sortString ){
      if( this.state.sortOrder === "asc"){
        order = "desc"
      }
      else{
        order = "asc"
      }
    }

    this.setState({ isLoading: true,sortString:sortstring,sortOrder:order });

    try {
      const students = await studentAPI.getStudents(1,order,sortstring);
      console.log(students);
      console.log(students.totalPage);
      this.setState({
        student: students.students,
        totalpage: students.totalPage
      });
    } catch (err) {
        // this.setState({ err: err.data.error_description });
         alert( "12312321");
         console.log( err);
    }
    this.setState({ isLoading: false });
  }
  render() {
    return (
      <div>
        {this.state.isLoading && <Loading />}
        <Menu />
        <div className="student-body">
          <h1 className="student-title">Students</h1>
          <Link
            className="button is-primary course-button"
            to="/student/create"
          >
            Add new student
          </Link>
          <table className="table">
            <thead>
              <tr>
                <th width="12%" onClick={this.handleOrder} >FirstName</th>
                <th width="12%" onClick={this.handleOrder} >LastName</th>
                <th width="30%" onClick={this.handleOrder} >Email</th>
                <th width="10%" onClick={this.handleOrder}>Gender</th>
                <th width="15%" onClick={this.handleOrder}>Date of birth</th>
                <th width="10%" onClick={this.handleOrder}>Credit</th>
                <th width="10%" />
              </tr>
            </thead>
            <tbody>
              {this.state.student.map(x => (
                <tr key={x.id}>
                 <td>{x.firstName}</td>
                  <td>{x.lastName}</td>
                  <td>{x.email}</td>
                  <td>{x.gender}</td>
                  <td>{x.dateOfBirth}</td>
                  <td>{x.credit}</td>
                  <td>
                    <Link
                    to={`/student/${x.id}`}
                    className="button is-white"
                  >
                    Detail
                  </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav className="pagination" role="navigation" aria-label="pagination">
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
              <button className="pagination-previous" onClick={this.handlePrevious}>
                Previous
              </button>
            )}
            {this.state.totalpage > this.state.currentpage && (
              <button className="pagination-next" onClick={this.handleNext}>
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
