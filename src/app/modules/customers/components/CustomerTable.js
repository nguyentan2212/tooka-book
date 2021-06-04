import React, { useState, useEffect } from "react";
import { getAllCustomer } from "../js/customer";
import CustomTable from "../../../../template/partials/components/CustomTable";
import { ConfirmDialog } from "../../../../template/partials/controls";

function CustomerTable(props) {
  const { filterFunc, setCustomer, setOpenPopUp } = props;
  const [customersList, setCustomersList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAllCustomer();
      setCustomersList(data);
    };
    fetchData();
  },[]);

  const headerCells = [
    {
      id: "Name",
      label: "Họ Tên",
    },
    {
      id: "PhoneNumber",
      label: "SĐT ",
    },
    {
      id: "Email",
      label: "Email ",
    },
    {
      id: "Address",
      label: "Địa chỉ ",
    },
    {
      id: "Debt",
      label: "Tiền nợ",
      isCurrency: true,
    },
  ];

  //Confirm Dialog
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const onDelete = (id) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    setCustomersList(customersList.filter((customer) => customer.id != id));
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

  const updateHandler = (customer) => {
    setCustomer(customer);
    setOpenPopUp({
      isOpen: true,
      title: "Cập Nhật Khách Hàng Mới",
    });
  };
  return (
    <div>
      <div className="table-responsive">
        <CustomTable
          headerCells={headerCells}
          data={customersList}
          filterFunc={filterFunc}
          hasPaging={true}
          updateHandler={(item) => updateHandler(item)}
          deleteHandler={(id) => deleteHandler(id)}
        />
      </div>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      ></ConfirmDialog>
    </div>
  );
}

export default CustomerTable;
