import React, { useState, useEffect } from "react";
import CustomTable from "../../../../template/partials/components/CustomTable";
import { getImports } from "../js/importBook";

function ImportBookListTable() {
  const [importList, setImportList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getImports();
      setImportList(data);
    };
    fetchData();
  }, []);

  const headerCells = [
    {
      id: "date",
      label: "Ngày lập",
    },
    {
      id: "total",
      label: "Tổng tiền",
      isCurrency: true,
    },
  ];

  return (
    <div className="table-responsive">
      <CustomTable
        data={importList}
        headerCells={headerCells}
        hasPaging={true}
      />
    </div>
  );
}

export default ImportBookListTable;
