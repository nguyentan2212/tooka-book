/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../template/helpers/AssetsHelpers";

export function TilesWidget({ className }) {
  const backgroundImageUrl = toAbsoluteUrl("/media/bg/bg-9.jpg");
  return (
    <div
      className={`card card-custom ${className} bgi-no-repeat bgi-no-repeat bgi-size-cover`}
      style={{
        backgroundImage: `url("${backgroundImageUrl}")`,
      }}
    >
      {/* begin::Body */}
      <div className="card-body d-flex flex-column">
        <div className="flex-grow-1 pb-5">
          {/* begin::Info */}
          <div className="d-flex align-items-center pr-2 mb-6">
            <span className="flex-grow-1">
              Tooka Book
            </span>
            <div className="symbol symbol-50">
              <span className="symbol-label bg-light-light">
                <SVG
                  src={toAbsoluteUrl("/media/svg/misc/015-telegram.svg")}
                  className="h-50 align-self-center"
                ></SVG>{" "}
              </span>
            </div>
          </div>
          {/* end::Info */}

          {/* begin::Link */}
          <a
            href="#"
            className="text-dark font-weight-bolder text-hover-primary font-size-h4"
          >
            Cửa hàng sách Tooka Book
          </a>
          {/* end::Link */}

          {/* begin::Desc */}
          <p className="text-dark-50 font-weight-normal font-size-lg mt-6">
            Tooka Book - hệ thống nhà sách uy tín, chất lượng.
            <br />
            Tất cả vì một gia sản sách to lớn, có sức sống dài lâu, 
            <br />
            có ý nghĩa với nhiều thế hệ bạn đọc.
          </p>
          {/* end::Desc */}
        </div>
      </div>
      {/* end::Body */}
    </div>
  );
}
