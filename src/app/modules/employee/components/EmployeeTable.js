import React, { useState, useEffect } from "react";
import { getAllEmployees } from "../js/employee";
import CustomTable from "../../../../template/partials/components/CustomTable";
import { PopUp } from "../../../../template/partials/controls";
import UpdateAccountForm from "./UpdateAccountForm";

function EmployeeTable(props) {
  const { filterFunc, updated, setUpdated } = props;
  const [employeesList, setEmployeesList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setEmployeesList(await getAllEmployees());
    };
    fetchData();
  }, [updated]);

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

  const [openPopUp, setOpenPopUp] = useState({
    isOpen: false,
    title: "Cập nhật nhân viên",
  });

  const [account, setAccount] = useState(null);

  const updateHandler = (employee) => {
    setOpenPopUp({
    isOpen: true,
    title: "Cập nhật nhân viên",
  });
    console.log(employee);
    if (employee)
    {
      setAccount(employee);
    }
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
      <PopUp
        openPopUp={openPopUp}
        setOpenPopUp={setOpenPopUp}
        title={openPopUp.title}
      >
        <UpdateAccountForm
          updated={updated}
          setUpdated={setUpdated}
          account={account}
        />
      </PopUp>
    </div>
  );
}

export default EmployeeTable;
