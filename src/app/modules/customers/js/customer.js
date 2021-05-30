import axios from "axios";

const {API_URL} = process.env;
export const GET_ALL_CUSTOMERS_URL = API_URL + "api/customer";

export async function getAllCustomer(){
    const result = await axios.get(GET_ALL_CUSTOMERS_URL);
    return result;
}