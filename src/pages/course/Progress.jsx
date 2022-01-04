import React, { useContext, useEffect } from "react";
import { logError, logSuccess } from "../../common/logger";
import CanEnrollGuard from "../../guards/CanEnrollGuard";
import LearnerGuard from "../../guards/LearnerGuard";
import { CourseProgress, LEARNER } from "../../models/models";
import { CourseDataContext } from "../../providers/CourseDataProvider";
import { enrollToCourse, getCourseProgress } from "../../services/course-service";
import { fetchAndStoreUser, getUser, isMyCourse } from "../../services/user-service";

export default function Progress () {
    const [ course, setCourse ] = useContext(CourseDataContext);
    let user = null;

    useEffect(() => {
        (async () => {
            try {
                user = getUser();
                if (user.type === LEARNER && isMyCourse(course.id)) {
                    const { data }  = await getCourseProgress(course.id);
            
                    const value     = await CourseProgress.validateAsync(data, { stripUnknown: true });
            
                    const newCourse = { ...course };
                    newCourse.progress = {
                        total_completeness: value.total_completeness,
                        done: value.activities.reduce((acc, cur) => [...acc, cur.activityId], [])
                    };
                    setCourse(newCourse);
                }
            } catch (e) {
                logError(e.message);
            }

        })();



    }, []);

    const submitEnroll = async () => {
        try {
            await enrollToCourse(course.id);

            await fetchAndStoreUser();

            user = getUser();

            logSuccess("Enrolled and redirecting");

            setTimeout(() => {
                window.location.reload();
            }, 5000);
        } catch (e) {
            logError(e.message);
        }
    }

    return (
        <LearnerGuard>
            {
                course.progress && course.progress !== {} && (
                    <h1>
                        Complete: { course.progress.total_completeness.toFixed(2) } %
                    </h1>

                )
            }
            <CanEnrollGuard>
                <button className="btn btn-primary" onClick={submitEnroll}>Enroll</button>
            </CanEnrollGuard>
        </LearnerGuard>
    )
}