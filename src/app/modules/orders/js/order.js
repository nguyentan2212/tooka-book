import axios from "axios";

const {API_URL} = process.env;

export const GET_ALL_ORDER_URL = API_URL + "api/order";

export async function getAllOrders(){
    const result = await axios.get(GET_ALL_ORDER_URL);
    return result;
}