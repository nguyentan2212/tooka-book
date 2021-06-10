import moment from "moment";

import { setupAxios } from "../../../js";
var objectMapper = require("object-mapper");

export const GET_ALL_ORDER_URL = "/api/bill";
const format1 = "YYYY-MM-DD HH:mm:ss";
const format2 = "DD/MM/YYYY";

export async function getAllOrders() {
  const result = await setupAxios()
    .get(GET_ALL_ORDER_URL)
    .then(({ data }) => {
      var map = {
        "[].SoHoaDon": "[].id",
        "[].MaKhachHang": "[].customerId",
        "[].TenKhachHang": "[].customer",
        "[].NgayLap": "[].createdAt",
        "[].TongTien": "[].total",
        "[].ThanhToan": "[].paid",
        "[].ConLai": "[].dept",
      };
      const dest = objectMapper(data, map);
      if (dest) {
        for (let i = 0; i < dest.length; i++) {
          let tepmDate = new Date(dest[i].createdAt);
          let destDate = moment(tepmDate).format(format2);
          dest[i].createdAt = destDate.toString();
        }
      }
      return dest;
    });
  return result;
}
