import axios from "axios";

const {API_URL} = process.env;

export const LOGIN_URL = API_URL + "api/auth/login";
export const REGISTER_URL = API_URL + "api/auth/register";

export function login(email, password) {
    return axios.post(LOGIN_URL, { email, password });
}

export function register(email, fullname, username, password) {
    return axios.post(REGISTER_URL, { email, fullname, username, password });
}