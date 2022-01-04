import axiosClient from "../common/client";
import { getMyCourses } from "./course-service";

const userLocalStorageKey = 'user';

const _fetchUser = async () => {
    const profileRes = await axiosClient.get('/my/profile');
    const user = { ...(profileRes.data) };
    
    const coursesRes = await getMyCourses();
    user.courses = coursesRes.data;

    return user;
}

export const getUser = () => {
    const userString = localStorage.getItem(userLocalStorageKey);
    return userString ? JSON.parse(userString) : {};
}

export const fetchAndStoreUser = async () => {
    const user = await _fetchUser();
    setUser(user);
}

export const isMyCourse = (course_id) => {
    const userString = localStorage.getItem(userLocalStorageKey);
    if (userString) {
        const user = JSON.parse(userString);
        return user.courses.filter(course => course.id === course_id).length > 0;
    }
    return false;
};

export const setUser = (user) => localStorage.setItem(userLocalStorageKey, JSON.stringify(user));