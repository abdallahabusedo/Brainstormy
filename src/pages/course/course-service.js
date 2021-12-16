import axiosClient from "../../client";

export const getCourseMetadata  = (course_id) => axiosClient.get(`/courses/${course_id}`);

export const editCourseMetadata = (course_id) => axiosClient.patch(`/courses/${course_id}`);

export const getCourseProgress  = (course_id) => axiosClient.get(`/courses/${course_id}/progress`);

export const enrollToCourse     = (course_id) => axiosClient.post(`/my/courses/${course_id}/enroll`);

export const getActivity        = (course_id) => axiosClient.get(`/courses/${course_id}/activites`);

export const getActivityContent = (course_id, activity_id) => axiosClient.get(`/courses/${course_id}/activities/${activity_id}/content`);

export const finishActivity     = (course_id, activity_id) => axiosClient.post(`/my/courses/${course_id}/progress/${activity_id}`);

export const addActivity        = (course_id) => axiosClient.post(`/courses/${course_id}/activities`);
