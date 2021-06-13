import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { Search } from "@material-ui/icons";
import { Input, CustomButton } from "../../../../template/partials/controls";
import { postRules } from "../js/rule";

function RulesForm(props) {
  const { rules } = props;

  const initialValues = {
    luongNhapToiThieu: rules.LuongNhapToiThieu,
    luongTonTruocKhiNhap: rules.LuongTonTruocKhiNhap,
    luongTonSauKhiBan: rules.LuongTonSauKhiBan,
    tienNoToiDa: rules.TienNoToiDa,
  };

  const UpdateRulesSchema = Yup.object().shape({
    luongNhapToiThieu: Yup.number().moreThan(0, "Không nhỏ hơn 0").required("Không được để trống"),
    luongTonTruocKhiNhap: Yup.number().moreThan(0, "Không nhỏ hơn 0").required("Không được để trống"),
    luongTonSauKhiBan: Yup.number().moreThan(0, "Không nhỏ hơn 0").required("Không được để trống"),
    tienNoToiDa: Yup.number().moreThan(0, "Không nhỏ hơn 0").required("Không được để trống"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: UpdateRulesSchema,
    onSubmit: (values, { setSubmitting }) => {
      postRules(values)
    },
  });

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }
    return "";
  };

  const clickHandler = (e) => {
    e.preventDefault();
    Swal.fire({
        icon: "success",
        title: "Update success",
        text: "Cập nhật thành công",
      });
  }
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="card card-custom mt-8">
        <div className="card-body pt-0 pb-3 my-4">
          <div className="d-flex flex-column">
            <div className="d-flex w-100 justify-content-around my-4">
              <Input
                variant="outlined"
                type="number"
                label="Lượng nhập tối thiểu"
                className={`${getInputClasses("luongNhapToiThieu")}`}
                {...formik.getFieldProps("luongNhapToiThieu")}
                error={
                  formik.touched.luongNhapToiThieu &&
                  formik.errors.luongNhapToiThieu
                }
                helperText={formik.errors.luongNhapToiThieu}
              ></Input>
              <Input
                variant="outlined"
                type="number"
                label="Lượng tồn trước khi nhập"
                className={`${getInputClasses("luongTonTruocKhiNhap")}`}
                {...formik.getFieldProps("luongTonTruocKhiNhap")}
                error={
                  formik.touched.luongTonTruocKhiNhap &&
                  formik.errors.luongTonTruocKhiNhap
                }
                helperText={formik.errors.luongTonTruocKhiNhap}
              ></Input>
            </div>
            <div className="d-flex w-100 justify-content-around my-4">
              <Input
                variant="outlined"
                type="number"
                label="Lượng tồn sau khi bán"
                className={`${getInputClasses("luongTonSauKhiBan")}`}
                {...formik.getFieldProps("luongTonSauKhiBan")}
                error={
                  formik.touched.luongTonSauKhiBan &&
                  formik.errors.luongTonSauKhiBan
                }
                helperText={formik.errors.luongTonSauKhiBan}
              ></Input>
              <Input
                variant="outlined"
                type="number"
                label="Tiền nợ tối đa"
                className={`${getInputClasses("tienNoToiDa")}`}
                {...formik.getFieldProps("tienNoToiDa")}
                error={formik.touched.tienNoToiDa && formik.errors.tienNoToiDa}
                helperText={formik.errors.tienNoToiDa}
              ></Input>
            </div>
          </div>
        </div>
        <div className="card-toolbar row w-100 justify-content-end">
          <CustomButton
            type="submit"
            text="Lưu"
            variant="outlined"
            startIcon={<Search></Search>}
            className="btn btn-success font-weight-bolder font-size-sm col-lg-2 ml-2"
            onClick={(e) => clickHandler(e)}
          ></CustomButton>
          <CustomButton
            text="Đặt lại"
            variant="outlined"
            startIcon={<Search></Search>}
            className="btn btn-primary font-weight-bolder font-size-sm col-lg-2 ml-2"
            onClick={formik.handleReset}
          ></CustomButton>
        </div>
      </div>
    </form>
  );
}

export default RulesForm;
