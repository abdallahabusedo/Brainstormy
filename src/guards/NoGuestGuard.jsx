import React, { useContext } from 'react'
import { ADMIN, INSTRUCTOR, LEARNER } from '../models/models';
import { CourseDataContext } from '../providers/CourseDataProvider';
import { getUser } from '../services/user-service';

export default function NoGuestGuard({ children }) {
    const user = getUser();
    const [ course, _ ] = useContext(CourseDataContext);

    return (
        <>
            { 
                course.users && (
                    (user.type === ADMIN) ||
                    (user.type === INSTRUCTOR && course.instructor.id === user.id) ||
                    (user.type === LEARNER && course.users.includes(user.id))
                ) && <> { children } </>
            }
        </>
    )
}