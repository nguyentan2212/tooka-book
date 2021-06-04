import categoryTable from "./categoryTable";
import { GET_ALL_CATEGORIES_URL } from "../js/category";

export default function mockCategory(mock){
    mock.onGet(GET_ALL_CATEGORIES_URL).reply(200, categoryTable);
}