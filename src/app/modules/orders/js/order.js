import moment from "moment";

import { setupAxios } from "../../../js";
var objectMapper = require("object-mapper");

export const GET_ALL_ORDER_URL = "/api/bill";
export const POST_ORDER_URL = "/api/bill";

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
          let tempDate = new Date(dest[i].createdAt);
          let destDate = moment(tempDate).format(format2);
          dest[i].createdAt = destDate.toString();
        }
      }
      return dest;
    });
  return result;
}

export function postBill(bill) {
  var map = {
    customerId: "MaKhachHang",
    totalPrice: "TongTien",
    paid: "ThanhToan",
    change: "ConLai",
    date: "NgayLap",
    "items[].id": "ChiTietHoaDon[].MaSach",
    "items[].amount": "ChiTietHoaDon[].SoLuong",
    "items[].price": "ChiTietHoaDon[].DonGiaBan",
    "items[].total": "ChiTietHoaDon[].ThanhTien",
  };
  const dest = objectMapper(bill, map);

  let tempDate = moment(new Date()).format(format1);
  dest.NgayLap = tempDate;

  console.log(dest);
  const result = setupAxios()
    .post(POST_ORDER_URL, dest)
    .then((result) => {
      return result;
    });
  return result;
}
