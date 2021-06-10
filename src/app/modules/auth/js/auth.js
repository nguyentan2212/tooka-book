import axios from "axios";
import userTableMock from "../_mocks_/userTableMock";

const { API_URL } = process.env;

export const LOGIN_URL = API_URL + "api/auth/login";
export const REGISTER_URL = API_URL + "api/auth/register";

export function login(email, password) {
  return onLogin(email, password);
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

const onLogin = (email, password) => {
  if (email && password) {
    const user = userTableMock.find(
      (x) =>
        x.email.toLowerCase() === email.toLowerCase() && x.password === password
    );

    if (user) {
        let result = {
          data: { ...user, password: undefined }
        }
        return result;
      }
  }
  return [400];
};
