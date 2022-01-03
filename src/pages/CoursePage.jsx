import React, { Component } from "react";
import Header from "../components/Header";
import courseImg from "./../assets/logo.png";
import axios from "axios";
import "./../../src/style/courses.css";
export default class CoursePage extends Component {
  constructor(props) {
    super(props);
    console.log(window.location.pathname.split("/")[2]);
    this.state = {
      courses: {},
      id: window.location.pathname.split("/")[2],
    };
  }
  EnrolOnCourse = () => {
        let userId = localStorage.getItem("accessToken");

    var config = {
      method: "post",
      url: `http://localhost:3000/my/courses/${this.state.id}/enroll`,
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  componentDidMount = () => {
    let userId = localStorage.getItem("accessToken");

    var config = {
      method: "get",
      url: `http://localhost:3000/courses/${this.state.id}`,
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        this.setState({
          courses: response.data,
        });
        console.log(this.state.courses);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <Header />
        <div>
          <div>
            <section className="vh-100 mt-5">
              <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-md-0 col-xl-8">
                    <div className="card">
                      <div className="card-body text-center">
                        {this.CourseInfo()}
                        {this.Enrol()}
                        <h2 className="h2">content</h2>
                        {this.Content()}
                        {this.state.files}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
  Content() {
    return (
      <div className="file-input  btn-lg ">
        <input
          type="file"
          id="file"
          className="file"
          onClick={(e) => this.onChange(e)}
        />
        <label for="file">Select file</label>
      </div>
    );
  }

  Enrol() {
    return (
      <div>
        <button
          className="btn btn-warning btn-lg btn-block mt-3 mb-5"
          onClick={this.EnrolOnCourse}
        >
          Enrol
        </button>
      </div>
    );
  }
  CourseInfo() {
    return (
      <div className="mt-0 mb-0">
        <div>
          <img
            src={courseImg}
            alt="course"
            className="rounded-circle img-fluid"
            width="200px"
          />
        </div>
        <h4 className="mb-2">{this.state.courses.name}</h4>
        <h4 className="mb-2">{this.state.courses.instructor}</h4>
        <p className=" h5 card-text">{this.state.courses.description}</p>
      </div>
    );
  }
}