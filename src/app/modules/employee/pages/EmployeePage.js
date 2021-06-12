import React, { useState } from "react";
import { InputAdornment } from "@material-ui/core";
import PageTitle from "../../../../template/layout/components/page-title/PageTitle";
import { LibraryBooks, Search, Add } from "@material-ui/icons";
import {
  Input,
  CustomButton,
  PopUp,
} from "../../../../template/partials/controls";
import EmployeeTable from "../components/EmployeeTable";
import NewAccountForm from "../components/NewAccountForm";

function EmployeePage(props) {
  const { className } = props;
  const [filterFunc, setFilterFunc] = useState({
    func: (items) => {
      return items;
    },
  });
  const handleSearch = (event) => {
    let target = event.target;

    setFilterFunc({
      func: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((item) =>
            item.Name.toLowerCase().includes(target.value)
          );
      },
    });
  };
  const [updated, setUpdated] = useState(0);
  //Popup modal
  const [openPopUp, setOpenPopUp] = useState({
    isOpen: false,
    title: "Thêm Nhân Viên Mới",
  });
  const onCreateEmployee = () => {
    setOpenPopUp({
      isOpen: true,
      title: "Thêm Nhân Viên Mới",
    });
    console.log(openPopUp);
  };

  return (
    <div>
      <PageTitle
        title="Quản Lý Nhân Viên"
        subTitle="Quản Lý Nhân Viên"
        icon={() => <LibraryBooks />}
      />
      <div className={`card card-custom ${className} mt-8`}>
        {/* begin::Header */}
        <div className="card-header border-0 py-5">
          <div className="card-toolbar row w-100 justify-content-between">
            <Input
              onChange={handleSearch}
              label="Search Employee"
              className="col-lg-9"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search></Search>
                  </InputAdornment>
                ),
              }}
            ></Input>
            <CustomButton
              text="Thêm Nhân Viên"
              variant="outlined"
              startIcon={<Add></Add>}
              className="btn btn-success font-weight-bolder font-size-sm col-lg-2"
              onClick={() => onCreateEmployee()}
            ></CustomButton>
          </div>
        </div>
        {/* end::Header */}
        {/* Body */}
        <div className="card-body pt-0 pb-3">
          <div className="tab-content">
            <EmployeeTable
              filterFunc={filterFunc}
              updated={updated}
              setUpdated={setUpdated}
            />
            <PopUp
              openPopUp={openPopUp}
              setOpenPopUp={setOpenPopUp}
              title={openPopUp.title}
            >
              <NewAccountForm updated={updated} setUpdated={setUpdated} />
            </PopUp>
          </div>
        </div>
        {/*end::Body */}
      </div>
    </div>
  );
}

export default EmployeePage;
