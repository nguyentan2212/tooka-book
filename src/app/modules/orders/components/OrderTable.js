import React, { useState, useEffect } from "react";
import { getAllOrders } from "../js/order";
import CustomTable from "../../../../template/partials/components/CustomTable";

function OrderTable(props) {
  const { filterFunc } = props;

  const [ordersList, setOrdersList] = useState([]);
  useEffect(() => {
    const fecthData = async () => {
      setOrdersList(await getAllOrders());
    };
    fecthData();
  }, []);

  const headerCells = [
    {
      id: "customer",
      label: "Khách hàng",
    },
    {
      id: "createdAt",
      label: "Ngày bán",
    },
    {
      id: "total",
      label: "Tổng tiền",
      isCurrency: true,
    },
    {
      id: "paid",
      label: "Khách đưa",
      isCurrency: true,
    },
    {
      id: "dept",
      label: "Tiền nợ",
      isCurrency: true,
    },
  ];
  return (
    <div>
      <div className="table-responsive">
        <CustomTable
          headerCells={headerCells}
          data={ordersList}
          filterFunc={filterFunc}
          hasPaging={true}
        />
      </div>
    </div>
  );
}

export default OrderTable;
