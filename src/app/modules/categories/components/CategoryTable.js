import React, { useState, useEffect } from "react";
import { getAllCategories } from "../js/category";
import CustomTable from "../../../../template/partials/components/CustomTable";
import { ConfirmDialog } from "../../../../template/partials/controls";
function CategoryTable(props) {
  const { filterFunc, updated } = props;

  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    const fecthData = async () => {
      const data = await getAllCategories();
      setCategoryList(data);
      console.log(data);
    };
    fecthData();
  }, [updated]);

  const headerCells = [
    {
      id: "name",
      label: "Name",
    },
  ];

  return (
    <div>
      <div className="table-responsive">
        <CustomTable
          headerCells={headerCells}
          data={categoryList}
          filterFunc={filterFunc}
          hasPaging={true}
        />
      </div>
    </div>
  );
}

export default CategoryTable;
