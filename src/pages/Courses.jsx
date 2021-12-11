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
    };
  }
  componentDidMount = async () => {
    await axios
      .get("http://localhost:2000/courses")
      .then((response) => {
        console.log(response.data);
        this.setState({
          courses: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(this.state.courses);
  };
  render() {
    return (
      <div>
        <Header />
        <div>
          <h1 className="m-5 p-5">Courses</h1>
        </div>
        {this.CourseCard()}
      </div>
    );
  }

  CourseCard() {
    return this.state.courses.map((course) => {
      console.log(course);
      return (
        <div className="card-group justify-content-center align-items-center d-inline-block">
          <div className="card card_de m-3 shadow-lg bg-white rounded  ">
            <img className="card-img-top" src={cardImg} alt="Card image cap" />
            <div className="card-body">
              <h4>{course.name}</h4>
              <p className="card-text">{course.description}</p>
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
