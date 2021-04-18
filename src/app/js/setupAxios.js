export default function setupAxios(axios, getToken) {
    axios.interceptors.request.use(
      config => {
        const authToken = getToken();
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      err => Promise.reject(err)
    );
  }
  