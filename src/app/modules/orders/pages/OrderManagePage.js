import React, { useState } from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../template/helpers/AssetsHelpers";
import OrderTable from "../components/OrderTable";

function OrderManagePage({ className }) {
  return (
    <div>
      <div className={`card card-custom ${className}`}>
        {/* begin::Header */}
        <div className="card-header border-0 py-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label font-weight-bolder text-dark">
              Danh sách hóa đơn
            </span>
          </h3>
          <div className="card-toolbar">
            <a
              href="#"
              className="btn btn-success font-weight-bolder font-size-sm"
            >
              <span className="svg-icon svg-icon-md svg-icon-white">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Shopping/Cart2.svg")}
                  className="h-50 align-self-center"
                ></SVG>
              </span>
              Thêm mới hóa đơn
            </a>
          </div>
        </div>
        {/* end::Header */}
        {/* Body */}
        <div className="card-body pt-0 pb-3">
          <div className="tab-content">
            <OrderTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderManagePage;
