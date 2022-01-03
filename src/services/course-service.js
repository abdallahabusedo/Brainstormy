import axiosClient from "../common/client";

export const getMyCourses           = () => axiosClient.get(`/my/courses`);

export const getCourseAll           = (course_id) => axiosClient.get(`/courses/${course_id}`);



export const getCourseProgress      = (course_id) => axiosClient.get(`/courses/${course_id}/progress`);

export const enrollToCourse         = (course_id) => axiosClient.post(`/my/courses/${course_id}/enroll`);

export const getActivity            = (course_id, activity_id) => axiosClient.get(`/courses/${course_id}/activities/${activity_id}/content`);


export const submitDone             = (course_id, activity_id) => axiosClient.post(`/my/courses/${course_id}/progress/${activity_id}`);

export const addActivity            = (course_id, activity) => axiosClient.post(`/courses/${course_id}/activities`, activity, { headers: { 'Content-Type': 'multipart/formdata' }});
