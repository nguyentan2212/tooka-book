import { setupAxios } from "../../../js";

export const GET_ALL_EMPLOYEE_URL = "/api/account";

export function login(username, password) {
  console.log(username,password);
  const result = setupAxios()
    .get(GET_ALL_EMPLOYEE_URL)
    .then(({ data }) => {
      const account = data.find((item) => item.username == username && item.password == password);
      console.log(data);
      let result = {
        username: account?.username,
        fullname: account?.Realname,
        email: account?.Email,
        isSuccess: account ? true : false,
      };
      return result;
    });
  return result;
}
