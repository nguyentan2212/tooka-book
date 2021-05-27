import React, { useState, useEffect } from "react";
import CustomTable from "../../../../template/partials/components/CustomTable";
import { ConfirmDialog } from "../../../../template/partials/controls";

function BookOrderTable(props) {
  const { onAddItem, bookOrderList, onDelete } = props;

  const headerCells = [
    {
      id: "title",
      label: "Tên sách",
    },
    {
      id: "amount",
      label: "Số lượng",
    },
    {
      id: "price",
      label: "Giá bán",
      isCurrency: true,
    },
    {
      id: "total",
      label: "Tổng tiền",
      isCurrency: true,
    },
  ];

  //Confirm Dialog
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const deleteHandler = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure to delete this item ?",
      subTitle: "You can't undo this action!",
      onConfirm: () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        onDelete(id);
      },
    });
  };

  return (
    <div>
      <div className="table-responsive">
        <CustomTable
          headerCells={headerCells}
          data={bookOrderList}
          deleteHandler={(id) => deleteHandler(id)}
        />
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        ></ConfirmDialog>
      </div>
    </div>
  );
}

export default BookOrderTable;
