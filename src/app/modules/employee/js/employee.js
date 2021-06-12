import { setupAxios } from "../../../js";
var objectMapper = require("object-mapper");

export const GET_ALL_EMPLOYEE_URL = "/api/account";
export const POST_ACCOUNT_URL = "/api/account";
export const UPDATE_ACCOUNT_URL = "/api/update";
export async function getAllEmployees() {
  const result = setupAxios()
    .get(GET_ALL_EMPLOYEE_URL)
    .then(({ data }) => {
      var map = {
        "[].Address": "[].address",
        "[].Email": "[].email",
        "[].PhoneNumber": "[].phonenumber",
        "[].Realname": "[].realname",
        "[].username": "[].username",
        "[].password": "[].password",
      };
      const dest = objectMapper(data, map);
      console.log(data);
      return dest;
    });
  return result;
}

export function postAccount(account) {
  
  const result = setupAxios().post(POST_ACCOUNT_URL, {
    username: account.username,
    realname: account.realname,
    PhoneNumber: account.phonenumber,
    Email: account.email,
    Address: account.address,
    password: account.password,
    type: 0,
  });
  return result;
}

export function updateAccount(account) {
    return 1;
}
