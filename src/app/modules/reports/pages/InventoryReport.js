import React, { useState, useEffect } from "react";
import InventoryTable from "../components/InventoryTable";
import { Download } from "../../../../template/partials/components/Download";
import PageTitle from "../../../../template/layout/components/page-title/PageTitle";
import {
  DatePicker,
  CustomButton,
} from "../../../../template/partials/controls";
import { LibraryBooks, Search } from "@material-ui/icons";

function InventoryReport({ className }) {
  const [reportDate, setReportDate] = useState(new Date());
  const [createReport, setCreateReport] = useState(new Date());

  const [reportData, setReportData] = useState({
    columns: [],
    data: [],
  });

  const onCreateReport = () => {
    setCreateReport(reportDate);
  };
  
  return (
    <div>
      <PageTitle
        title="Báo Cáo Tồn Kho"
        subTitle="Báo Cáo Tồn Kho"
        icon={() => <LibraryBooks />}
      />
      <div className={`card card-custom ${className} mt-8`}>
        <div className="card-header border-0 py-5">
          <div className="card-toolbar row w-100 justify-content-end">
            <DatePicker
              label="Tháng Báo Cáo"
              className="col-lg-9"
              views={["year", "month"]}
              value={reportDate}
              onChange={({ target }) => setReportDate(target.value)}
            ></DatePicker>
            <CustomButton
              text="Tạo Báo Cáo"
              variant="outlined"
              startIcon={<Search></Search>}
              className="btn btn-success font-weight-bolder font-size-sm col-lg-2 ml-2"
              onClick={() => onCreateReport()}
            ></CustomButton>
            <Download name="Báo Cáo Tồn Kho" reportData={reportData}></Download>
          </div>
        </div>
        <div className="card-body pt-0 pb-3">
          <InventoryTable
            setReportData={setReportData}
            createReport={createReport}
          />
        </div>
      </div>
    </div>
  );
}

export default InventoryReport;
