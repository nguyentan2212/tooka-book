import React, { useState, useEffect } from "react";
import { getAllCustomers } from "../js/customer";
import CustomTable from "../../../../template/partials/components/CustomTable";
import { ConfirmDialog } from "../../../../template/partials/controls";

function CustomerTable(props) {
  const { filterFunc, setCustomer, setOpenPopUp } = props;
  const [customersList, setCustomersList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCustomers();
      setCustomersList(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const headerCells = [
    {
      id: "name",
      label: "Họ Tên",
    },
    {
      id: "phoneNumber",
      label: "SĐT ",
    },
    {
      id: "email",
      label: "Email ",
    },
    {
      id: "address",
      label: "Địa chỉ ",
    },
    {
      id: "debt",
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
          updateHandler={updateHandler}
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
