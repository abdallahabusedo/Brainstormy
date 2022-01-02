import React, { useContext } from "react";
import courseImg from "../../assets/logo.png";
import { CourseDataContext } from "../../providers/CourseDataProvider";

export default function CourseInfo () {
	const [course, _] = useContext(CourseDataContext);

	return (
		<div className="mt-0 mb-0 row">
			<div className="col-4">
			<img
				src={courseImg}
				className="rounded-circle img-fluid"
				width="200px"
			/>
			</div>
			<div className="col-8 text-start">
				<div className="d-flex flex-column justify-content-center h-100">
					<h4 className="mb-2 ">{course.name}</h4>
					<h6 className="mb-2">{course.instructor.first_name}</h6>
					<p>{course.description}</p>
				</div>
			</div>
		</div>
	)
}
