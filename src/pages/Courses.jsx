import React, { Component } from "react";
import Header from "../components/Header";
import "./../style/courses.css";
import cardImg from "./../assets/logo.png";
import axiosClient from "../common/client";
import { INSTRUCTOR } from "../models/models";
import { getUser } from "../services/user-service";
class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      myCourses: [],
    };
    this.user = getUser();
  }
  componentDidMount = async () => {
    let token = localStorage.getItem("accessToken");

		axiosClient
			.get('/other/courses')
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
		console.log('courses', this.state.courses);

		axiosClient
			.get('/my/courses')
			.then((response) => {
				console.log('data', response.data);
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
		let id = localStorage.getItem('accessToken');
		let a = id === '' ? false : true;
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
        {
          +(this.user.type) !== +INSTRUCTOR && (
            <>
              <div>
                <h1 className="m-5 p-5">Courses</h1>
              </div>
              {this.CourseCard()}
            </>
          )
        }
      </div>
    );
  }

	ContentIfNL() {
		return (
			<div>
				<h1 className='m-5 p-5'> Join To View Courses </h1>
				<a href='/signup'>
					<button className='btn btn-warning btn-lg btn-block mt-3 mb-5'>Join here</button>
				</a>
			</div>
		);
	}

	CourseCard() {
		return (
			<div className='row'>
				{this.state.courses.map((course) => (
					<div className='col-m-4 col-sm-6 col-xs-12 col-lg-4 col-xl-4'>
						<div className='card-group justify-content-center align-items-center d-inline-block'>
							<div className='card card_de d-flex text-center m-3 shadow-lg bg-white rounded  '>
								<img className='card-img-top m-auto w-75 h-75' src={cardImg} alt='CardImageCap' />
								<div className='card-body'>
									<h4>{course.name}</h4>
									<h6 className='card-text'>{course.description}</h6>
									<h6>start: {course.start_date.slice(0, 10)}</h6>
									<h6>end: {course.end_date.slice(0, 10)}</h6>
									{this.Submit(course.id)}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		);
	}
	MyCourseCard() {
		return (
			<div className='row'>
				{this.state.myCourses.map((course) => (
					<div className='col-m-4 col-sm-6 col-xs-12 col-lg-4 col-xl-4'>
						<div className='card-group d-flex text-center justify-content-center align-items-center d-inline-block'>
							<div className='card card_de d-flex text-center m-3 shadow-lg bg-white rounded  '>
								<img className='card-img-top m-auto w-75 h-75' src={cardImg} alt='CardImageCap' />
								<div className='card-body'>
									<h4>{course.name}</h4>
									<h6 className='card-text'>{course.description}</h6>
									<h6>start: {course.start_date.slice(0, 10)}</h6>
									<h6>end: {course.end_date.slice(0, 10)}</h6>
									{this.Submit(course.id)}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		);
	}

	Submit(i) {
		return (
			<div>
				<a href={`/course/${i}`}>
					<button type='button' className='btn btn-warning'>
						View Course
					</button>
				</a>
			</div>
		);
	}
}

export default Courses;
