import axiosClient from "../common/client";

export const getCourseAll           = (course_id) => axiosClient.get(`/courses/${course_id}`);

export const getCourseMetadata      = (course_id) => axiosClient.get(`/courses/${course_id}/metadata`);

export const editCourseMetadata     = (course_id, courseData) => axiosClient.patch(`/courses/${course_id}`, courseData);

export const getCourseProgress      = (course_id) => axiosClient.get(`/courses/${course_id}/progress`);

export const enrollToCourse         = (course_id) => axiosClient.post(`/my/courses/${course_id}/enroll`);

export const getActivity            = (course_id) => axiosClient.get(`/courses/${course_id}/activites`);

export const getActivityContent     = (course_id, activity_id) => axiosClient.get(`/courses/${course_id}/activities/${activity_id}/content`);

export const editActivityMetadata   = (course_id, activity_id, activityMetadata) => axiosClient.patch(`/courses/${course_id}/activities/${activity_id}`, activityMetadata);

export const submitDone             = (course_id, activity_id) => axiosClient.post(`/my/courses/${course_id}/progress/${activity_id}`);

export const addActivity            = (course_id) => axiosClient.post(`/courses/${course_id}/activities`);
