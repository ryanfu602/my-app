import React from "react";
import "./student.css";

function StudentDetails() {
  return (
    <div className="student-body">
      <h1 className="student-title ">Student details</h1>
      <a className="button is-danger is-hovered student-delete-button">
        Delete student
      </a>

      <div className="student-form">
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label ">Full name</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <input className="input" type="text" />
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
                <input className="input" type="text" />
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
                  <select>
                    <option>Male</option>
                    <option>Female</option>
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
                <input className="input" type="text" />
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
                <input className="input" type="text" />
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
                <input className="input" type="text" />
              </div>
            </div>
          </div>
        </div>

        <div className="field is-grouped is-grouped-right">
          <p className="control">
            <a className="button is-primary is-hovered ">Submit</a>
          </p>
          <p className="control">
            <a className="button is-light">Cancel</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
