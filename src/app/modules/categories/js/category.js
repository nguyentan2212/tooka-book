import axios from "axios";

var objectMapper = require("object-mapper");

const { REACT_APP_API_URL } = process.env;
export const GET_ALL_CATEGORIES_URL = REACT_APP_API_URL + "api/category";

export async function getAllCategories() {
  //const { data } = await axios.get(GET_ALL_CATEGORIES_URL);
  
  
}

export function fetchAllCategories(){
    fetch('http://localhost:5000/api/category').then(response => response.json())
    .then(res => {
        var map = {
          "[].MaTheLoai": "[].id",
          "[].TenTheLoai": "[].name",
        };
        
        const dest = objectMapper(res, map);
        console.log(dest);
        return dest;
    })
}