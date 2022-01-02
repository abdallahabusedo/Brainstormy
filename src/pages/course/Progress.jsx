import React, { useContext } from "react";
import { logError, logSuccess } from "../../common/logger";
import { LEARNER } from "../../models/models";
import { CourseDataContext } from "../../providers/CourseDataProvider";
import { enrollToCourse } from "../../services/course-service";
import { getUser } from "../../services/user-service";

export default function Progress () {
    const [course, setCourse] = useContext(CourseDataContext);
    const user = getUser();

    const submitEnroll = async () => {
        try {
            await enrollToCourse(course.id);

            logSuccess("Enrolled and redirecting");

            setTimeout(() => {
                window.location.reload();
            }, 5000);
        } catch (e) {
            logError(e.message);
        }
    }

    return (
        <>
            {
                course.users && user.type === LEARNER && (
                    <>
                        {
                            course.users.includes(user.id) && course.progress && course.progress !== {} ? (
                                <h1>
                                    Complete: {course.progress.total_completeness} %
                                </h1>

                            ) : (
                                <button onClick={submitEnroll}>Enroll</button>
                            )
                        }
                    </>
                )
            }
        </>
    )
}