import axiosClient from "../common/client";
import { UserData } from "../models/models";

const userLocalStorageKey = 'user';

export const fetchUser = () => axiosClient.get('/my/user');

export const getUser = () => {
    const user = JSON.parse(localStorage.getItem(userLocalStorageKey));

    const { value } = UserData.validate(user);

    return value;
}

export const setUser = (user) => localStorage.setItem(userLocalStorageKey, JSON.stringify(user));