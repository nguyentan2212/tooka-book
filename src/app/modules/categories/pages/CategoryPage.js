import React, { useState } from "react";
import { InputAdornment } from "@material-ui/core";
import PageTitle from "../../../../template/layout/components/page-title/PageTitle";
import { Category, Search, Add } from "@material-ui/icons";
import { Input, CustomButton } from "../../../../template/partials/controls";
import CategoryTable from "../components/CategoryTable";
import Swal from "sweetalert2";
import { postCategory } from "../js/category";

function CategoryPage(props) {
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

  const onCreateCategory = async () => {
    const { value: categoryName } = await Swal.fire({
      title: "Nhập tên thể loại",
      input: "text",
      inputLabel: "Tên thể loại",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Không được để trống!";
        }
      },
    });
    if (categoryName) {
      const result = await postCategory(categoryName);
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
        title="Quản Lý Thể Loại"
        subTitle="Quản Lý Thể Loại"
        icon={() => <Category />}
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
              onClick={() => onCreateCategory()}
            ></CustomButton>
          </div>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className="card-body pt-0 pb-3">
          <div className="tab-content">
            <CategoryTable filterFunc={filterFunc} updated={updated} />
          </div>
        </div>
        {/* end::Body */}
      </div>
    </div>
  );
}

export default CategoryPage;
