import React, { Component } from "react";
import Header from "../components/Header";
import "./../style/courses.css";
import cardImg from "./../assets/logo.png";
import axios from "axios";
class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      myCourses: [],
    };
  }
  componentDidMount = async () => {
    let token = localStorage.getItem("accessToken");
    var config = {
      method: "get",
      url: "http://localhost:3000/other/courses",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        this.setState(
          {
            courses: response.data,
          },
          () => {}
        );
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log("courses", this.state.courses);

    config = {
      method: "get",
      url: "http://localhost:3000/my/courses",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then((response) => {
        console.log("data",response.data);
        this.setState(
          {
            myCourses: response.data,
          },
          () => {}
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  render() {
    let id = localStorage.getItem("accessToken");
    let a = id === "" ? false : true;
    return (
      <div>
        <Header />
        {a ? this.ContentIfL() : this.ContentIfNL()}
      </div>
    );
  }

  ContentIfL() {
    return (
      <div>
        <div>
          <h1 className="m-5 p-5">My Courses</h1>
          {this.MyCourseCard()}
        </div>
        <div>
          <h1 className="m-5 p-5">Courses</h1>
        </div>

        {this.CourseCard()}
      </div>
    );
  }

  ContentIfNL() {
    return (
      <div>
        <h1 className="m-5 p-5"> Join To View Courses </h1>
        <a href="/signup">
          <button className="btn btn-warning btn-lg btn-block mt-3 mb-5">
            Join here
          </button>
        </a>
      </div>
    );
  }

  CourseCard() {
    return this.state.courses.map((course) => {
      console.log(course);
      return (
        <div className="card-group justify-content-center align-items-center d-inline-block">
          <div className="card card_de m-3 shadow-lg bg-white rounded  ">
            <img className="card-img-top" src={cardImg} alt="CardImageCap" />
            <div className="card-body">
              <h4>{course.name}</h4>
              <h6 className="card-text">{course.description}</h6>
              <h6>start: {course.start_date.slice(0, 10)}</h6>
              <h6>end: {course.end_date.slice(0, 10)}</h6>
              {this.Submit(course.id)}
            </div>
          </div>
        </div>
      );
    });
  }
  MyCourseCard() {
    return this.state.myCourses.map((course) => {
      console.log(course);
      return (
        <div className="card-group justify-content-center align-items-center d-inline-block">
          <div className="card card_de m-3 shadow-lg bg-white rounded  ">
            <img className="card-img-top" src={cardImg} alt="CardImageCap" />
            <div className="card-body">
              <h4>{course.name}</h4>
              <h6 className="card-text">{course.description}</h6>
              <h6>start: {course.start_date.slice(0, 10)}</h6>
              <h6>end: {course.end_date.slice(0, 10)}</h6>
              {this.Submit(course.id)}
            </div>
          </div>
        </div>
      );
    });
  }

  Submit(i) {
    return (
      <div>
        <a href={`/course/${i}`}>
          <button type="button" className="btn btn-warning">
            View Course
          </button>
        </a>
      </div>
    );
  }
}

export default Courses;
