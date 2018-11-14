import React from "react";
import "./lecturer.css";

function LecturerDetails() {
  return (
    <div className="lecturer-body">
      <h1 className="lecturer-title ">Lecturer details</h1>
      <button className="button is-danger is-hovered lecturer-delete-button">
        Delete lecturer
      </button>

      <div className="lecturer-form">
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
              <div className="control lecturer-form-credit">
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
              <div className="control lecturer-form-date">
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
              <div className="control lecturer-form-credit">
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

export default LecturerDetails;
