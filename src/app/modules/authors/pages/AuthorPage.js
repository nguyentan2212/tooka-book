import React, { useState } from "react";
import { InputAdornment } from "@material-ui/core";
import Swal from "sweetalert2";
import PageTitle from "../../../../template/layout/components/page-title/PageTitle";
import { Person, Search, Add } from "@material-ui/icons";
import { Input, CustomButton } from "../../../../template/partials/controls";
import AuthorTable from "../components/AuthorTable";
import { postAuthor } from "../js/author";

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
  const [updated, setUpdated] = useState(0);

  const onCreateAuthor = async () => {
    const { value: authorName } = await Swal.fire({
      title: "Nhập tên tác giả",
      input: "text",
      inputLabel: "Tên tác giả",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Không được để trống!";
        }
      },
    });
    if (authorName) {
      const result = await postAuthor(authorName);
      if (result.status === 200) {
        Swal.fire({
          title: "Thêm mới thành công",
          icon: "success",
        });
        setUpdated(!updated);
      } else {
        Swal.fire({
          title: "Thêm mới thất bại",
          icon: "error",
        });
      }
    }
  };

  return (
    <div>
      <PageTitle
        title="Quản Lý Tác Giả"
        subTitle="Quản Lý Tác Giả"
        icon={() => <Person />}
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
            <AuthorTable filterFunc={filterFunc} updated={updated} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorPage;
