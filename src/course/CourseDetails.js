import React from "react";
import "./course.css";

function CourseDetails() {
  return (
    <div className="course-body">
      <h1 className="course-title ">Course details</h1>
      <a className="button is-danger is-hovered course-delete-button">
        Delete course
      </a>
      <div className="course-form">
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label ">Title</label>
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
            <label className="label">Fee</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control course-form-fee">
                <input className="input" type="text" />
              </p>
            </div>
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Max students</label>
          </div>
          <div className="field-body">
            <div className="field is-narrow">
              <div className="control course-form-maxstudent">
                <div className="select is-fullwidth ">
                  <select>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Description</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div clclassNameass="control">
                <textarea className="textarea" />
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

export default CourseDetails;
