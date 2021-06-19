import React from "react";
import { Link } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../template/helpers/AssetsHelpers";
import PageTitle from "../../../../template/layout/components/page-title/PageTitle";
import { Store } from "@material-ui/icons";
import ImportBookListTable from "../components/ImportBookListTable";

function ImportBookList() {
  return (
    <div>
      <PageTitle
        title="Quản Lý Nhập Sách"
        subTitle="Quản Lý Nhập Sách"
        icon={() => <Store />}
      />
      <div className="card card-custom mt-8">
        <div className="card-header border-0 py-5">
          <div className="card-toolbar">
            <Link
              to="/nhaphang"
              className="btn btn-success font-weight-bolder font-size-sm justify-content-end"
            >
              <span className="svg-icon svg-icon-md svg-icon-white">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Shopping/Cart2.svg")}
                  className="h-50 align-self-center"
                ></SVG>
              </span>
              Nhập sách mới
            </Link>
          </div>
        </div>
        <div className="card-body pt-0 pb-3">
          <div className="tab-content">
            <ImportBookListTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImportBookList;
