import React from "react";
import "./lecturer.css";

function LecturerList() {
  return (
    <div className="lecturer-body">
      <h1 className="lecturer-title">Lectures</h1>
      <a className="button is-primary is-hovered lecturer-button">
        Add new lecturer
      </a>

      <table className="table">
        <thead>
          <tr>
            <th width="25%">Name</th>
            <th width="45%">Email</th>
            <th width="20%">Staff number</th>
            <th width="10%" />s
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>38</td>
            <td>23</td>
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

export default LecturerList;
