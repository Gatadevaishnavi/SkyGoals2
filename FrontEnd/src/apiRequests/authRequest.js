import { axiosInstance } from "./axiosInstance";

// define api 
const LOGIN = "users/login"
const SIGNUP = "users/signup"
const GET_USERS_DETAILES = "users/"


export function login(payload) {
    return axiosInstance.post(LOGIN, payload);
}

export function signup(payload) {
    return axiosInstance.post(SIGNUP, payload);
}

export function getUsersDetailes(payload) {
    return axiosInstance.get(GET_USERS_DETAILES, payload);
}
