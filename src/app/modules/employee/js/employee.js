import { setupAxios } from "../../../js";
var objectMapper = require("object-mapper");

export const GET_ALL_EMPLOYEE_URL = "/api/account";

export async function getAllEmployees() {
    const result = setupAxios().get(GET_ALL_EMPLOYEE_URL).then(({data}) => {
        var map = {
            "[].Address": "[].address",
            "[].Email": "[].email",
            "[].PhoneNumber": "[].phonenumber",
            "[].Realname": "[].realname",
            "[].username": "[].username",
        }
        const dest = objectMapper(data, map);
        console.log(dest);
        return dest;
    });
    return result;
}