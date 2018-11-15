import React from "react";
import "./lecturer.css";
import { redirect } from "../app/AppFunc";
import Menu from "../app/Menu";
import Loading from "../app/Loading";
import Comfirm from "../app/Comfirm";
import { Link } from "react-router-dom";
import * as LecturerAPI from "./LecturerAPI";

class LecturerDetails extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      Lecturer: "",
      error: "",
      deleteComfirm: false,
      saveComfire: false
    };
  }
  isCreate = () => {
    return this.props.match.params.id === "create";
  };

  handleFieldChange = e => {
    const {
      target,
      target: { name }
    } = e;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      Lecturer: {
        ...this.state.Lecturer,
        [name]: value
      }
    });
  };

  async componentDidMount() {

    const id = this.props.match.params.id;
  
    if (this.isCreate()) {
      this.setState({
        Lecturer: {
          staffNumber: "",
          name: "",
          email: "",
          bibliography: ""
        }
      });
      return;
    }

    this.setState({ isLoading: true });

    try {
      const Lecturer = await LecturerAPI.getLecturerById(id);
      this.setState({Lecturer: Lecturer});
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
        console.log("create id =", this.state.Lecturer);
        await LecturerAPI.createLecturer(this.state.Lecturer);
      } else {
        console.log( this.state.Lecturer);
        await LecturerAPI.updateLecturer(this.state.Lecturer, id);
      }
      redirect("/Lecturers");
    } catch (err) {
      console.log(err);
      this.setState({ error: err.data.message });
    }
    this.setState({ isLoading: false, saveComfirm: false });
  };

  
  handleDeleteSubmit = async e  => {
    const id=this.props.match.params.id;
    this.setState({ isLoading: true });
    try{
        await LecturerAPI.deleteLecturer ( id  );
        redirect("/Lecturers");
    }
    catch(err){
      this.setState({ error: err.data.message });
    }
    this.setState({ isLoading: false ,deleteComfirm: false});

  };

  render() {
    return (
      <div>
        <Menu />
        {this.state.isLogin && <Loading />}
        <div className="lecturer-body">
          {this.state.error && (
            <div className="course-err">{this.state.error}</div>
          )}
          <h1 className="lecturer-title ">Lecturer details</h1>
          {!this.isCreate() && (
            <button
              className="button is-danger is-hovered Lecturer-delete-button"
              onClick={this.handleDelete}
            >
              Delete Lecturer
            </button>
          )}

          <div className="lecturer-form">
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label ">StaffNumber</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control lecturer-form-number">
                    <input
                      className="input"
                      type="text"
                      value={this.state.Lecturer.staffNumber}
                      name="staffNumber"
                      onChange={this.handleFieldChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label ">Name</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      value={this.state.Lecturer.name}
                      name="name"
                      onChange={this.handleFieldChange}
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
                      value={this.state.Lecturer.email}
                      name="email"
                      onChange={this.handleFieldChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label ">Bibliography</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      value={this.state.Lecturer.bibliography}
                      name="bibliography"
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
                <Link className="button is-light" to="/Lecturers">
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
          Are you sure you want to delete this Lecturer?
        </Comfirm>
        <Comfirm
          active={this.state.saveComfirm}
          onComfire={this.handleSubmit}
          onCancel={this.handleCancelSave}
          title="Are you sure to continue"
        >
          Are you sure you want to save this Lecturer?
        </Comfirm>
      </div>
    );
  }
}
export default LecturerDetails;
