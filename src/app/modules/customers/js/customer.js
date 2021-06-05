import { setupAxios } from "../../../js";
var objectMapper = require("object-mapper");

export const GET_ALL_CUSTOMERS_URL = "/api/customer";

export async function getAllCustomers() {
  const result = setupAxios()
    .get(GET_ALL_CUSTOMERS_URL)
    .then(({ data }) => {
      var map = {
        "[].MaKhachHang": "[].id",
        "[].TenKhachHang": "[].name",
        "[].DiaChi": "[].address",
        "[].SoDienThoai": "[].phoneNumber",
        "[].Email": "[].email",
        "[].SoTienNo": "[].debt",
      };
      const dest = objectMapper(data, map);
      return dest;
    });
  return result;
}
