import { result } from "lodash";
import { setupAxios } from "../../../js";

const GET_RULES_URL = "/api/rules";
const POST_RULES_URL = "/api/rules";

export async function getAllRules() {
  const result = await setupAxios().get(GET_RULES_URL).then(({data}) =>{
      const temp = data[data.length - 1];
      return temp;
  });
  return result;
}

export function postRules(rules) {
    result = setupAxios().post(POST_RULES_URL, {
        LuongNhapToiThieu: rules.luongNhapToiThieu,
        LuongTonTruocKhiNhap: rules.luongTonTruocKhiNhap,
        LuongTonSauKhiBan: rules.luongTonSauKhiBan,
        TienNoToiDa: rules.tienNoToiDa,
    }).then((result) => {
        return result;
    })
    
    return result;
}