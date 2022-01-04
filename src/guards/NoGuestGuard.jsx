import React, { useContext } from 'react'
import { ADMIN, INSTRUCTOR, LEARNER } from '../models/models';
import { CourseDataContext } from '../providers/CourseDataProvider';
import { getUser, isMyCourse } from '../services/user-service';

export default function NoGuestGuard({ children }) {
    const user = getUser();
    const [ course, _ ] = useContext(CourseDataContext);

    return (
        <>
            { 
                (
                    (user.type === ADMIN) ||
                    (user.type === INSTRUCTOR && course.instructor.id === user.id) ||
                    (user.type === LEARNER && isMyCourse(course.id))
                ) && <> { children } </>
            }
        </>
    )
}