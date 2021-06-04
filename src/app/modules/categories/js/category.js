import axios from "axios";

const {API_URL} = process.env;
export const GET_ALL_CATEGORIES_URL = API_URL + "api/category";

export async function getAllCategories(){
    const result = await axios.get(GET_ALL_CATEGORIES_URL);
    return result;
}