import React, { useMemo, useState, useEffect } from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../template/helpers/AssetsHelpers";
import { getOverviewInfo } from "../js/dashboard";

export function OverviewWiget({ className }) {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fecthData = async () => {
      const result = await getOverviewInfo();
      setInfo(result);
      console.log(result);
    };
    fecthData();
  }, []);

  return (
    <div className={`card card-custom bg-gray-100 ${className}`}>
      {/* Header */}
      <div className="card-header border-0 bg-danger py-5">
        <h3 className="card-title font-weight-bolder text-white">Thống kê</h3>
      </div>
      {/* Body */}
      <div className="card-body p-0">
        {/* Stat */}
        <div className="card-spacer mt-n25">
          <div className="row m-0">
            <div className="col bg-light-warning px-6 py-8 rounded-xl mr-7 mb-7">
              <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Media/Equalizer.svg")}></SVG>
              </span>
              <div className="d-flex flex-column">
                <a href="#" className="text-warning font-weight-bold font-size-h6">
                  Doanh thu
                </a>
                <a className="text-warning font-weight-bold font-size-h6">
                  {info && info.revenue} vnđ
                </a>
              </div>
            </div>
            <div className="col bg-light-primary px-6 py-8 rounded-xl mb-7">
              <span className="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Add-user.svg")}></SVG>
              </span>
              <a href="#" className="text-primary font-weight-bold font-size-h6 mt-2">
                Nhân viên {info && info.employeeNumber}
              </a>
            </div>
          </div>
          <div className="row m-0">
            <div className="col bg-light-danger px-6 py-8 rounded-xl mr-7">
              <span className="svg-icon svg-icon-3x svg-icon-danger d-block my-2">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}></SVG>
              </span>
              <a href="#" className="text-danger font-weight-bold font-size-h6 mt-2">
                Đơn hàng {info && info.billNumber}
              </a>
            </div>
            <div className="col bg-light-success px-6 py-8 rounded-xl">
              <span className="svg-icon svg-icon-3x svg-icon-success d-block my-2">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Urgent-mail.svg")}></SVG>
              </span>
              <a href="#" className="text-success font-weight-bold font-size-h6 mt-2">
                Tựa sách {info && info.bookNumber}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
