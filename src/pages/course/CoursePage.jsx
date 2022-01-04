import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header';
import '../../../src/style/courses.css';
import { getCourseAll } from '../../services/course-service';
import { CourseData } from '../../models/models';
import { logError } from '../../common/logger';
import CourseInfo from './CourseInfo';
import Content from './content/Content';
import Progress from './Progress';
import CourseDataProvider, { CourseDataContext } from '../../providers/CourseDataProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorViewer from '../../components/Error';
import QA from './QA';
import { getUser, fetchAndStoreUser } from '../../services/user-service';

toast.configure();

function Course(props) {
	const [course, setCourse] = useContext(CourseDataContext);
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		const user = getUser;
		if (!user || user === {}) fetchAndStoreUser();
	}, []);

	useEffect(() => {
		(async () => {
			try {
				// Get course metadata
				const res = await getCourseAll(course.id);

				// Validate and cast
				const validCourseData = await CourseData.validateAsync(res.data, {
					stripUnknown: true,
					presence: 'required',
				});

				// Set state
				setCourse(validCourseData);

				setLoaded(true);
			} catch (e) {
				console.log(e);
				setError(e);
				logError(e.message);
			}
		})();
		return () => {};
	}, []);

	return (
		<>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<Header />
			<section className='vh-100 mt-5 py-5'>
				{loaded ? (
					<div className='row d-flex'>
						<div className='col-12'>
							<CourseInfo />
							<Progress />
							<Content />
							<QA />
						</div>
					</div>
				) : (
					<div class='spinner-border' role='status'></div>
				)}
			</section>
		</>
	);
}

export default function CoursePage() {
	return (
		<CourseDataProvider>
			<Course />
		</CourseDataProvider>
	);
}
