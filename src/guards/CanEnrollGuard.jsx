import React, { useContext } from 'react'
import { LEARNER } from '../models/models';
import { CourseDataContext } from '../providers/CourseDataProvider';
import { getUser, isMyCourse } from '../services/user-service';

export default function CanEnrollGuard({ children }) {
    const user = getUser();
    const [ course, _ ] = useContext(CourseDataContext);
    return (
        <>
            { +(user.type) === +LEARNER && !isMyCourse(course.id) && (<>{ children }</>) }
        </>
    );
}