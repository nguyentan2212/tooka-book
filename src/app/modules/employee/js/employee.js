import { setupAxios } from "../../../js";
var objectMapper = require("object-mapper");

export const GET_ALL_EMPLOYEE_URL = "/api/account";

export async function getAllEmployees() {
    const result = setupAxios().get(GET_ALL_EMPLOYEE_URL).then(({data}) => {
        console.log(data);
        return data;
    });
    return result;
}