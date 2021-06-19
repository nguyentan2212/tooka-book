import moment from "moment";

import { setupAxios } from "../../../js";
var objectMapper = require("object-mapper");

const format1 = "YYYY-MM-DD";
const format2 = "DD/MM/YYYY";

const GET_IMPORTS = "/api/ImportBookList";
const POST_IMPORTS = "/api/ImportBook";

export const getImports = async () => {
  const result = setupAxios()
    .get(GET_IMPORTS)
    .then(({ data }) => {
      var map = {
        "[].SoPhieuNhap": "[].id",
        "[].NgayLap": "[].date",
        "[].TongTien": "[].total",
      };
      console.log(data);
      const dest = objectMapper(data, map);
      if (dest) {
        for (let i = 0; i < dest.length; i++) {
          let tempDate = new Date(dest[i].date);
          let destDate = moment(tempDate).format(format2);
          dest[i].date = destDate.toString();
        }
      }
      return dest;
    });
  return result;
};

export const postImport = (data) => {
  var map = {
    "total": "TongTien",
    "items[].id": "DanhSachSachMua[].MaSach",
    "items[].amount": "DanhSachSachMua[].SoLuong",
    "items[].price": "DanhSachSachMua[].DonGia",
    "items[].totalPrice": "DanhSachSachMua[].ThanhTien",
  };

  const dest = objectMapper(data, map);
  let tempDate = moment(new Date()).format(format1);
  dest.NgayLap = tempDate;
  console.log(dest);
  const result = setupAxios()
    .post(POST_IMPORTS, dest)
    .then((result) => {
      return result;
    });
  return result;
};
