import React, { useState, useEffect } from "react";
import { getAllOrders } from "../js/order";
import CustomTable from "../../../../template/partials/components/CustomTable";
import {
  Notification,
  ConfirmDialog,
} from "../../../../template/partials/controls";

function OrderTable(props) {
  const { filterFunc } = props;

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
      id: "customerPaid",
      label: "Khách đưa",
      isCurrency: true,
    },
    {
      id: "returnCustomer",
      label: "Tiền thừa",
      isCurrency: true,
    },
  ];

  //Notification
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  //Confirm Dialog
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const onDelete = (id) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    setOrdersList(ordersList.filter((order) => order.id != id));
  };

  const deleteHandler = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure to delete this item ?",
      subTitle: "You can't undo this action!",
      onConfirm: () => {
        onDelete(id);
      },
    });
  };
  return (
    <div>
      <div className="table-responsive">
        <CustomTable
          headerCells={headerCells}
          data={ordersList}
          filterFunc={filterFunc}
          hasPaging={true}
          deleteHandler={(id) => deleteHandler(id)}
        />
      </div>
      <Notification notify={notify} setNotify={setNotify}></Notification>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      ></ConfirmDialog>
    </div>
  );
}

export default OrderTable;
