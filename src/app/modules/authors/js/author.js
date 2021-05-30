import axios from "axios";

const {API_URL} = process.env;
export const GET_ALL_AUTHORS_URL = API_URL + "api/author";

export async function getAllAuthor(){
    const result = await axios.get(GET_ALL_AUTHORS_URL);
    return result;
}