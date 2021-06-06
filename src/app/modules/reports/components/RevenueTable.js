import React, { useState, useEffect } from "react";
import CustomTable from "../../../../template/partials/components/CustomTable";
import { getRevenueReport } from "../js/report";

function RevenueTable(props) {
  const { setReportData, createReport } = props;
  const [revenueList, setRevenueList] = useState([]);

  const headerCells = [
    {
      id: "bookId",
      label: "Tựa Sách",
    },
    {
      id: "bookSold",
      label: "Đã Bán",
    },
    {
      id: "total",
      label: "Tổng Tiền",
      isCurrency: true,
    },
  ];

  useEffect(() => {
    const fetchData = async (date) => {
      const result = await getRevenueReport(
        date.getMonth() + 1,
        date.getFullYear()
      );
      setRevenueList(result);
      const reportData = {
        columns: headerCells,
        data: result,
      };
      setReportData(result);
      setReportData(reportData);
      console.log(date.getMonth(), date.getFullYear());
    };
    fetchData(createReport);
  }, [createReport]);

  return (
    <div>
      <div className="table-responsive">
        <CustomTable
          headerCells={headerCells}
          data={revenueList}
          hasPaging={false}
        />
      </div>
    </div>
  );
}

export default RevenueTable;
