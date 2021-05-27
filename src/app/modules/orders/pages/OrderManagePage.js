import React, { useState } from "react";
import SVG from "react-inlinesvg";
import { InputAdornment } from "@material-ui/core";
import { toAbsoluteUrl } from "../../../../template/helpers/AssetsHelpers";
import OrderTable from "../components/OrderTable";
import PageTitle from "../../../../template/layout/components/page-title/PageTitle";
import { LibraryBooks, Search } from "@material-ui/icons";
import { Input } from "../../../../template/partials/controls";

function OrderManagePage({ className }) {
  const [filterFunc, setFilterFunc] = useState({
    func: (items) => {
      return items;
    },
  });

  const handleSearch = (event) => {
    let target = event.target;
    setFilterFunc({
      func: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((item) =>
            item.customer.toLowerCase().includes(target.value)
          );
      },
    });
  };
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
          <div className="card-toolbar row w-100 justify-content-between">
            <Input
              onChange={handleSearch}
              label="Search Categories"
              className="col-lg-9"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search></Search>
                  </InputAdornment>
                ),
              }}
            ></Input>
            <a
              href="#"
              className="btn btn-success font-weight-bolder font-size-sm col-lg-2"
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
            <OrderTable filterFunc={filterFunc} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderManagePage;
