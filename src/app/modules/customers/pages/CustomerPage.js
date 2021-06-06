import React, { useState } from "react";
import { InputAdornment } from "@material-ui/core";
import PageTitle from "../../../../template/layout/components/page-title/PageTitle";
import { LibraryBooks, Search, Add } from "@material-ui/icons";
import {
  Input,
  CustomButton,
  PopUp,
} from "../../../../template/partials/controls";
import CustomerTable from '../components/CustomerTable';
import CustomerForm from "../components/CustomerForm";

function CustomerPage(props) {
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
  //Popup modal
  const [openPopUp, setOpenPopUp] = useState({
    isOpen: false,
    title: "Thêm Khách Hàng Mới",
  });
  const onCreateCustomer = () => {
    setOpenPopUp({
      isOpen: true,
      title: "Thêm Khách Hàng Mới",
    });
    console.log(openPopUp);
  };

  //chứa author được update
  const [customer, setCustomer] = useState(null);
  
  return (
    <div>
      <PageTitle
        title="Quản Lý Khách Hàng"
        subTitle="Quản Lý Khách Hàng"
        icon={() => <LibraryBooks />}
      />
      <div className={`card card-custom ${className} mt-8`}>
        {/* begin::Header */}
        <div className="card-header border-0 py-5">
          <div className="card-toolbar row w-100 justify-content-between">
            <Input
              onChange={handleSearch}
              label="Search Customers"
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
              text="Thêm Khách Hàng"
              variant="outlined"
              startIcon={<Add></Add>}
              className="btn btn-success font-weight-bolder font-size-sm col-lg-2"
              onClick={() => onCreateCustomer()}
            ></CustomButton>
          </div>
        </div>
        {/* end::Header */}
        {/* Body */}
        <div className="card-body pt-0 pb-3">
          <div className="tab-content">
            <CustomerTable
              filterFunc={filterFunc}
              setOpenPopUp={setOpenPopUp}
              setCustomer={setCustomer}
            />
            <PopUp
              openPopUp={openPopUp}
              setOpenPopUp={setOpenPopUp}
              title={openPopUp.title}
            >
              <CustomerForm
                customer={customer}
                setOpenPopUp={setOpenPopUp}
                setCustomer={setCustomer}
              ></CustomerForm>
            </PopUp>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerPage;
