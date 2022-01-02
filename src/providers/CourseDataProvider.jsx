import React, { createContext, useState } from 'react'
import { getRouteParam } from '../common/helpers';

const defaultCourseContext = {
    id: getRouteParam(2),
    name: '',
    start_date: new Date(),
    end_date: new Date(),
    description: '',
    instructor: {},
    activities: [],
    progress: {
        total_completeness: 0,
        done: {}
    }
};

export const CourseDataContext = createContext();

export default function CourseDataProvider(props) {
    const [courseData, setCourseData] = useState(defaultCourseContext);

    return (
        <CourseDataContext.Provider value={[courseData, setCourseData]}>
            {props.children}
        </CourseDataContext.Provider>
    );
};


