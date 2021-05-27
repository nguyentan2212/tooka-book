import React, { useState, useEffect } from "react";
import { getAllOrders } from "../js/order";
import CustomTable from '../../../../template/partials/components/CustomTable';

function OrderTable() {
  const [ordersList, setOrdersList] = useState([]);
  useEffect(() => {
    const fecthData = async () => {
      const { data } = await getAllOrders();
      setOrdersList(data);
    };
    fecthData();
  }, []);

  const headerCells = [
    {
      id:"customer",
      label:"Khách hàng",
    },
    {
      id:"createdAt",
      label:"Ngày bán"
    },
    {
      id:"total",
      label:"Tổng tiền",
      isCurrency: true,
    },
    {
      id:"customerPaid",
      label:"Khách đưa",
      isCurrency: true,
    },
    {
      id:"returnCustomer",
      label:"Tiền thừa",
      isCurrency: true,
    },
  ];

  return (
    <div>
      <div className="table-responsive">
        <CustomTable headerCells={headerCells} data={ordersList} />
      </div>
    </div>
  );
}

export default OrderTable;
