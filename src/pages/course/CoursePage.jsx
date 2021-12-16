import React, { Component } from "react";
import Header from "../components/Header";
import courseImg from "./../assets/logo.png";
import "./../../src/style/courses.css";

import { getCourseAll } from "./course-service";
import { CourseMetadata } from "../../models/models";
import { error, logError } from "../../logger";
import { getRouteParam } from "../../common/helpers";
export default class CoursePage extends Component {
  constructor(props) {
    super(props);
    console.log(getRouteParam(2));
    this.state = {
      id: getRouteParam(2),
      name: '',
      start_date: new Date(),
      end_date: new Date(),
      description: '',
      instructor_id: '',
      activities: [],
      progress: {},
    };
  }
  componentDidMount = async () => {
    try {
      // Get course metadata
      const res = await getCourseAll(this.state.id);
      
      // Validate
      const { value, error } = CourseMetadata.validate(res.data, { stripUnknown: true, presence: 'required'});

      console.log(validCourseMetadata.value);

      // Set state
      this.setState(validCourseMetadata.value);

      // TODO :: Remove
      console.log(this.state);
    
    } catch (e) {
      logError(e);
    }
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
        <button className="btn btn-warning btn-lg btn-block mt-3 mb-5">
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