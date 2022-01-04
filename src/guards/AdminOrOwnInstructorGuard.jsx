import React, { useContext } from 'react'
import { ADMIN, INSTRUCTOR } from '../models/models';
import { CourseDataContext } from '../providers/CourseDataProvider';
import { getUser } from '../services/user-service'

export default function AdminOrOwnInstructorGuard({ children }) {
    const user = getUser();
    const [ course, _ ] = useContext(CourseDataContext);

    return (
        <>
            { (user.type === ADMIN || (user.type === INSTRUCTOR && course.instructorId === user.id)) && <> { children } </> }
        </>
    )
}