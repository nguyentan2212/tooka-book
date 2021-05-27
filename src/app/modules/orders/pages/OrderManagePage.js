import React, { useState } from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../template/helpers/AssetsHelpers";
import OrderTable from "../components/OrderTable";
import PageTitle from "../../../../template/layout/components/page-title/PageTitle";
import { LibraryBooks } from '@material-ui/icons';

function OrderManagePage({ className }) {
  return (
    <div>
      <PageTitle 
        title="Quản Lý Hóa Đơn"
        subTitle="Quản Lý Hóa Đơn"
        icon={() => <LibraryBooks />}
      />
      <div className={`card card-custom ${className} mt-8`}>
        {/* begin::Header */}
        <div className="card-header border-0 py-5">
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
