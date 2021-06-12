import React, { useState, useEffect } from "react";
import { getAllAuthor } from "../js/author";
import CustomTable from "../../../../template/partials/components/CustomTable";

function AuthorTable(props) {
  const { filterFunc, updated } = props;

  const [authorsList, setAuthorsList] = useState([]);
  useEffect(() => {
    const fecthData = async () => {
      const dest = await getAllAuthor();
      setAuthorsList(dest);
      console.log(dest);

    };
    fecthData();
  }, [updated]);

  const headerCells = [
    {
      id: "name",
      label: "Họ Tên",
    },
  ];

  return (
    <div>
      <div className="table-responsive">
        <CustomTable
          headerCells={headerCells}
          data={authorsList}
          filterFunc={filterFunc}
          hasPaging={true}
        />
      </div>
    </div>
  );
}

export default AuthorTable;
