import axios from "axios";
import { getToken } from "./utilities/token";

function setupAxios() {
  const instance = axios.create({ baseURL: "http://localhost:5000" });

  instance.interceptors.request.use(
    (config) => {
      const authToken = getToken();
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    },
    (err) => Promise.reject(err)
  );
  return instance;
}

export default setupAxios;
