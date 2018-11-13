import React from "react";
import "./student.css";
import * as studentAPI from "./StudentAPI";
import Menu from "../app/Menu";
import Loading from "../app/Loading";

class StudentList extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      student: [],
      error: "",
      currentpage: 1,
      totalpage:1
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const students = await studentAPI.getStudents(this.state.page);
      console.log(students);
      console.log(students.totalPage);
      this.setState({ student: students.students, totalpage:students.totalPage });
    } catch (err) {
      this.setState({ err: err.data.error_description });
    }
    this.setState({ isLoading: false });
  }

  pageList=()=>{
    let pagelist =[];
    let max = this.state.totalpage;
    for( let i = 1 ;i<=max;i++){
      pagelist.push(<option>{i}</option>);
    }
    return pagelist;
  }
  render() {
    return (
      <div>
        {this.state.isLogin && <Loading />}
        <Menu />
        <div className="student-body">
          <h1 className="student-title">Students</h1>
          <button className="button is-primary is-hovered student-button">
            Add new Student
          </button>

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
                    <a className="button is-white is-small">Details</a>
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
                      name="selectpage"
                      value={this.state.currentpage}
                      onChange={this.handleFieldChange}
                    >
                     {this.pageList()}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {this.state.currentpage!== 1 && <button class="pagination-previous">Previous</button>}
            <button class="pagination-next">Next page</button>
          </nav>
        </div>
      </div>
    );
  }
}

export default StudentList;
