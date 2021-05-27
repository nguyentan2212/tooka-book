import axios from "axios";

const {API_URL} = process.env;
export const GET_ALL_BOOKS_URL = API_URL + "api/book";

export async function getAllBooks(){
    const result = await axios.get(GET_ALL_BOOKS_URL);
    return result;
}