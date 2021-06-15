import { setupAxios } from "../../../js";
var objectMapper = require("object-mapper");

export const GET_INVENTORY_REPORT_URL = "/api/report/inventory";
export const GET_REVENUE_REPORT_URL = "/api/report/revenue";

export async function getInventoryReport(month, year) {
  const result = setupAxios()
    .post(GET_INVENTORY_REPORT_URL, {
      Thang: month,
      Nam: year,
    })
    .then(({ data }) => {
      var map = {
        "[].MaSach": "[].bookId",
        "[].TenSach": "[].title",
        "[].TonDau": "[].firstBuy",
        "[].PhatSinh": "[].buyMore",
        "[].TonCuoi": "[].inStock",
      };
      const dest = objectMapper(data, map);
      return dest;
    });

  return result;
}

export async function getRevenueReport(month, year) {
  const result = setupAxios()
    .post(GET_REVENUE_REPORT_URL, {
      Thang: month,
      Nam: year,
    })
    .then(({ data }) => {
      var map = {
        "[].MaSach": "[].bookId",
        "[].TenSach": "[].title",
        "[].SoLuongBan": "[].bookSold",
        "[].TongTien": "[].total",
      };
      const dest = objectMapper(data, map);
      return dest;
    });
  return result;
}
