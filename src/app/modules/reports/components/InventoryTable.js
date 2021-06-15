import React, { useState, useEffect } from "react";
import CustomTable from "../../../../template/partials/components/CustomTable";
import { getInventoryReport } from "../js/report";

function InventoryTable(props) {
  const { setReportData, createReport } = props;
  const [inventoryList, setInventoryList] = useState([]);

  const headerCells = [
    {
      id: "title",
      label: "Tựa Sách",
    },
    {
      id: "firstBuy",
      label: "Mua Đầu",
    },
    {
      id: "buyMore",
      label: "Phát Sinh",
    },
    {
      id: "inStock",
      label: "Tồn Kho",
    },
  ];

  useEffect(() => {
    const fetchData = async (date) => {
      const result = await getInventoryReport(
        date.getMonth() + 1,
        date.getFullYear()
      );
      setInventoryList(result);
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
          data={inventoryList}
          hasPaging={false}
        />
      </div>
    </div>
  );
}

export default InventoryTable;
