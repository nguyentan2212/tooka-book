import { setupAxios } from "../../../js";
var objectMapper = require("object-mapper");

export const GET_ALL_AUTHORS_URL = "/api/author";

export function getAllAuthor() {
  const result = setupAxios().get(GET_ALL_AUTHORS_URL).then(({ data }) => {
    var map = {
      "[].MaTacGia": "[].id",
      "[].TenTacGia": "[].name",
    }
    const dest = objectMapper(data, map);

    return dest;
  });
  return result;
}
