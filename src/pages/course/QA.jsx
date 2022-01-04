import React, { useContext, useState } from 'react'
import NoGuestGuard from '../../guards/NoGuestGuard';
import { CourseDataContext } from '../../providers/CourseDataProvider'
import { getUser } from '../../services/user-service';

export default function QA() {
    const user = getUser();
    const [ course, setCourse ] = useContext(CourseDataContext);

    return (
        <NoGuestGuard>
            {/* TODO : Add code here */}
            <h1>QA Section</h1>
        </NoGuestGuard>
    );
}