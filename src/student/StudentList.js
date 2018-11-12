import React from "react";
import "./student.css";

function StudentList() {
  return (
    <div className="student-body">
      <h1 className="student-title">Students</h1>
      <a className="button is-primary is-hovered student-button">
        Add new Student
      </a>

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
          <tr>
            <td>Ryan</td>
            <td>Ryanfu602@gmail.com</td>
            <td>M</td>
            <td>19840602</td>
            <td>12</td>
            <td>
              <a className="button is-white is-small">Details</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
