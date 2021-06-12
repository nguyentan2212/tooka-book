import moment from "moment";

import { setupAxios } from "../../../js";
var objectMapper = require("object-mapper");

const format1 = "YYYY-MM-DD HH:mm:ss";

export const GET_ALL_CUSTOMERS_URL = "/api/customer";
export const POST_CUSTOMER_URL = "/api/customer";
export const CUSTOMER_PAY_URL = "/api/payment";

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
      console.log(data);
      return dest;
    });
  return result;
}

export function postCustomer(fullname, email, phonenumber, address) {
  const result = setupAxios().post(POST_CUSTOMER_URL, {
    TenKhachHang: fullname,
    Email: email,
    SoDienThoai: phonenumber,
    DiaChi: address,
  });
  return result;
}

export function customerPay(customerId, money){
  const result = setupAxios().post(CUSTOMER_PAY_URL,{
    MaKhachHang: customerId,
    TienThu: money,
    NgayLap: moment(new Date()).format(format1),
  });
  return result;
}