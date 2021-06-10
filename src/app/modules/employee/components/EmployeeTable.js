import React, { useState, useEffect } from "react";
import { getAllEmployees } from "../js/employee";
import CustomTable from "../../../../template/partials/components/CustomTable";
import { ConfirmDialog } from "../../../../template/partials/controls";

function EmployeeTable(props) {
  const { filterFunc, setEmployee, setOpenPopUp } = props;
  const [employeesList, setEmployeesList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setEmployeesList(await getAllEmployees());
    };
    fetchData();
  }, []);

  const headerCells = [
    {
      id: "username",
      label: "Username",
    },
    {
      id: "realname",
      label: "Họ Tên",
    },
    {
      id: "phonenumber",
      label: "SĐT",
    },
    {
      id: "email",
      label: "Email ",
    },
    {
      id: "address",
      label: "Địa chỉ ",
    },
  ];

  //Confirm Dialog
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const updateHandler = (employee) => {
    setEmployee(employee);
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
          data={employeesList}
          filterFunc={filterFunc}
          hasPaging={true}
          updateHandler={updateHandler}
        />
      </div>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      ></ConfirmDialog>
    </div>
  );
}

export default EmployeeTable;
