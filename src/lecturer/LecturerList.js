import React from "react";
import "./lecturer.css";
import * as lecturerAPI from "./LecturerAPI";
import Menu from "../app/Menu";
import Loading from "../app/Loading";
import {Link} from  "react-router-dom"

class LecturerList extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      lecturer: [],
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
      const Lecturers = await lecturerAPI.getLecturers(this.state.currentpage,this.state.sortOrder,this.state.sortString);
      this.setState({
        lecturer: Lecturers.lecturers,
        totalpage: Lecturers.totalPage
      });
    } catch (err) {
      this.setState({ err: err.data.error_description });
    }
    this.setState({ isLoading: false });

    /*test laoding*/ 
    // setTimeout(function(){this.setState({ isLoading: false })}.bind(this),3000);
    
    
  }

  handleFieldChange = async e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.setState({ isLoading: true });
    try {
      const Lecturers = await lecturerAPI.getLecturers(value,this.state.sortOrder,this.state.sortString);
      console.log(Lecturers);
      console.log(Lecturers.totalPage);
      this.setState({
        lecturer: Lecturers.lecturers,
        totalpage: Lecturers.totalPage
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
      const Lecturers = await lecturerAPI.getLecturers(this.state.currentpage - 1,this.state.sortOrder,this.state.sortString);
      console.log(Lecturers);
      console.log(Lecturers.totalPage);
      this.setState({
        lecturer: Lecturers.lecturers,
        totalpage: Lecturers.totalPage
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
      const Lecturers = await lecturerAPI.getLecturers(this.state.currentpage + 1,this.state.sortOrder,this.state.sortString);
      console.log(Lecturers.lecturer);
      console.log(Lecturers.totalPage);
      this.setState({
        lecturer: Lecturers.lecturers,
        totalpage: Lecturers.totalPage
      });
    } catch (err) {
      // this.setState({ err: err.data.error_description });
      console.log(err);
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
      const lecturer = await lecturerAPI.getLecturers(1,order,sortstring);

      this.setState({
        lecturer: lecturer.lecturers,
        totalpage: lecturer.totalPage
      });
    } catch (err) {
        
         alert( "12312321");
         console.log( err);
         this.setState({ err: err.data.error_description });
    }
    this.setState({ isLoading: false });
  }


  render() {
    return (
      <div>
        {this.state.isLoading && <Loading />}
        <Menu />
        <div className="lecturer-body">
          <h1 className="lecturer-title">Lecturers</h1>
          <Link
            className="button is-primary course-button"
            to="/Lecturer/create"
          >
            Add new lecturer
          </Link>

          <table className="table">
            <thead>
              <tr>
               <th width="10%" onClick={this.handleOrder}>StaffNumber</th>
                <th width="20%" onClick={this.handleOrder}>Name</th>
                <th width="20%" onClick={this.handleOrder}>Email</th>
                <th width="30%" onClick={this.handleOrder}>Bibliography</th>
                <th width="10%" />
              </tr>
            </thead>
            <tbody>
              {this.state.lecturer.map(x => (
                <tr key={x.id}>
                  <td>{x.staffNumber}</td>
                  <td>{x.name}</td>
                  <td>{x.email}</td>
                  <td>{x.bibliography}</td>
                  <td>
                    <Link
                    to={`/Lecturer/${x.id}`}
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

export default LecturerList;
