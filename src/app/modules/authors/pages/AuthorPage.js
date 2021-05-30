import React, { useState } from "react";
import { InputAdornment } from "@material-ui/core";
import PageTitle from "../../../../template/layout/components/page-title/PageTitle";
import { LibraryBooks, Search, Add } from "@material-ui/icons";
import {
  Input,
  CustomButton,
  PopUp,
  Notification
} from "../../../../template/partials/controls";
import AuthorTable from "../components/AuthorTable";
import AuthorForm from "../components/AuthorForm";
function AuthorPage(props) {
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
  const [openPopUp, setOpenPopUp] = useState(false);
  const onCreateAuthor = () => {
    setOpenPopUp(true);
    console.log(openPopUp);
  };

  //chứa author được update
  const [author, setAuthor] = useState(null);

  return (
    <div>
      <PageTitle
        title="Quản Lý Tác Giả"
        subTitle="Quản Lý Tác Giả"
        icon={() => <LibraryBooks />}
      />
      <div className={`card card-custom ${className} mt-8`}>
        {/* begin::Header */}
        <div className="card-header border-0 py-5">
          <div className="card-toolbar row w-100 justify-content-between">
            <Input
              onChange={handleSearch}
              label="Search Authors"
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
              text="Thêm tác giả"
              variant="outlined"
              startIcon={<Add></Add>}
              className="btn btn-success font-weight-bolder font-size-sm col-lg-2"
              onClick={() => onCreateAuthor()}
            ></CustomButton>
          </div>
        </div>
        {/* end::Header */}
        {/* Body */}
        <div className="card-body pt-0 pb-3">
          <div className="tab-content">
            <AuthorTable
              filterFunc={filterFunc}
              setOpenPopUp={setOpenPopUp}
              setAuthor={setAuthor}
            />
            <PopUp
              openPopUp={openPopUp}
              setOpenPopUp={setOpenPopUp}
              title="Bảng Thêm Tác Giả"
            >
              <AuthorForm
                author={author}
                setOpenPopUp={setOpenPopUp}
                setAuthor={setAuthor}
              ></AuthorForm>
            </PopUp>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorPage;
