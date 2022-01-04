import React, { Component } from "react";
import Header from "../components/Header";
import logo from "./../assets/logo.png";
import swal from "@sweetalert/with-react";
import axiosClient from "../common/client";
import { logSuccess } from "../common/logger";

export default class CreateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CourseName: "",
      description: "",
      startDate: "",
      endDate: "",
    };
  }
  onClick = () => {
    var data = JSON.stringify({
      name: this.state.CourseName,
      description: this.state.description,
      start_date: this.state.startDate,
      end_date: this.state.endDate,
    });

    axiosClient.post('/my/courses', data)
      .then(function (response) {
        logSuccess("Course created");
        setTimeout(() => {
          window.location = "/courses";
        }, 3000);
      })
      .catch(function (error) {
        console.log(error);
        swal({
          title: "Please check again the Data",
          icon: "error",
        });
      });
  };
  handleChange = (e) => {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    this.setState({
      [name]: value,
    });
  };
  render() {
    return (
      <div>
        <Header />
        <section className="vh-100 mt-5">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-0 col-xl-8">
                <div className="card">
                  <div className="card-body text-center">
                    <div className="mt-0 mb-0">
                      <img
                        alt="img"
                        src={logo}
                        width="300px"
                        className="rounded-circle img-fluid"
                      />
                    </div>
                    <h1 className="mb-2 mt-4"> Create Course</h1>
                    {this.courseName()}
                    {this.description()}
                    <h4>Start Date</h4>
                    {this.startDate()}
                    <h4>End Date</h4>
                    {this.endDate()}
                    {this.CreateCourse()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  courseName() {
    return (
      <div className="form-outline mb-4">
        <input
          required
          type="text"
          id="form2Example37"
          name="CourseName"
          className="mt-4 form-control form-control-lg"
          placeholder="Course Name"
          onChange={this.handleChange}
        />
      </div>
    );
  }
  description() {
    return (
      <div className="form-outline mb-4">
        <input
          required
          type="text"
          id="form2Example37"
          name="description"
          className="mt-4 pt-5 pb-5 form-control form-control-lg"
          placeholder="Course Description"
          onChange={this.handleChange}
        />
      </div>
    );
  }
  startDate() {
    return (
      <div className="form-outline mb-4">
        <input
          required
          type="date"
          id="form2Example27"
          name="startDate"
          className="form-control form-control-lg"
          onChange={this.handleChange}
        />
      </div>
    );
  }
  endDate() {
    return (
      <div className="form-outline mb-4">
        <input
          required
          type="date"
          id="form2Example27"
          name="endDate"
          className="form-control form-control-lg"
          onChange={this.handleChange}
        />
      </div>
    );
  }
  CreateCourse() {
    return (
      <div className="pt-1 mb-4">
        <button
          className={"btn px-5 btn-warning btn-lg btn-block"}
          type="button"
          onClick={this.onClick}
        >
          Create Course
        </button>
      </div>
    );
  }
}
