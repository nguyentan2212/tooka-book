import { setupAxios } from "../../../js";
var objectMapper = require("object-mapper");

export const GET_ALL_CATEGORIES_URL = "/api/category";
export const POST_CATEGORIE_URL = "/api/category";

export function getAllCategories() {
  const result = setupAxios().get(GET_ALL_CATEGORIES_URL).then(({ data }) => {
    var map = {
      "[].MaTheLoai": "[].id",
      "[].TenTheLoai": "[].name",
    };
    const dest = objectMapper(data, map);
    return dest;
  });
  return result;
}

export function postCategory(name){
  const result = setupAxios().post(POST_CATEGORIE_URL,{
    name:name,
  });
  return result;
}

