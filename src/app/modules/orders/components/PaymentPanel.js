import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import { Input, CustomButton } from "../../../../template/partials/controls";
import { getAllCustomers } from "../../customers/js/customer";
import { getToken } from "../../../js/utilities/token";
import { postBill } from "../js/order";

import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

function PaymentPanel(props) {
  const { orderItemList, rules, customerList, updated, setUpdated } = props;
  const [customer, setCustomer] = useState(null);
  const formattedDate = format(new Date(), "dd/ MM/ yyyy");

  const initialValues = {
    date: formattedDate,
    customerId: 0,
    totalPrice: 0,
    debt: 0,
    paid: 0,
    change: 0,
    items: [],
  };
  const AddBillSchema = Yup.object().shape({
    customerId: Yup.number().required("Không được để trống").min(1, "Không được để trống"),
    totalPrice: Yup.number(),
    debt: Yup.number().max(
      rules.TienNoToiDa,
      `Vượt quá nợ tối đa. Tiền nợ tối đa là ${rules.TienNoToiDa}`
    ),
    paid: Yup.number().min(0, "Số tiền tối thiểu là 0đ"),
    change: Yup.number(),
    items: Yup.array().min(1, "Hóa đơn không có sản phẩm nào"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: AddBillSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      postBill(values)
        .then(() => {
          setUpdated(!updated);
          Swal.fire({
            icon: "success",
            title: "Created success",
            text: "Thêm thành công",
          });
          resetForm(initialValues);
        })
        .catch((e) => {
          setSubmitting(false);
          Swal.fire({
            icon: "error",
            title: "Oops...Created failed!",
            text: `Error: ${e.message}`,
          });
          console.log("error");
        });
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

  useEffect(() => {
    const calculateTotalPrice = () => {
      const result = orderItemList.reduce((total, item) => {
        return total + item.price * item.amount;
      }, 0);
      return result;
    };
    let total = calculateTotalPrice();
    formik.setFieldValue("totalPrice", total);
    formik.setFieldValue("items", orderItemList);
    let paid = formik.values.paid;
    let change = (paid > total) ? paid - total : 0;
    formik.setFieldValue("change", change);
  }, [orderItemList]);

  const onCustomerChange = (option) => {
    if (option) {
      setCustomer(option);
      formik.setFieldValue("customerId", option?.id || 0);
      let change = formik.values.change;
      let debt = change < 0 ? option.debt - change : option.debt;
      formik.setFieldValue("debt", debt);
    }
  };

  useEffect(() => {
    if (customer) {
      let paid = formik.values.paid;
      let total = formik.values.totalPrice;
      let debt = (paid > total) ? customer.debt : customer.debt + (total-paid);
      let change = (paid > total) ? paid - total : 0;
      formik.setFieldValue("change", change);
      formik.setFieldValue("debt", debt);
    }
  }, [formik.values.paid]);

  const clickHandler = async (e) => {
    e.preventDefault();
    if (formik.errors.items) {
      Swal.fire({
        title: "Opp!",
        text: "Hóa đơn chưa có sản phẩm nào!",
        icon: "error",
      });
    } else {
      await formik.submitForm();
    }
  };

  var formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <div className="card card-custom">
      <div className="card-header">
        <div className="row">
          <h3 className="card-title">Thanh toán</h3>
        </div>
      </div>
      <form className="form fv-plugins-bootstrap fv-plugins-framework">
        {/*Begin::Ngày bán */}
        <div className="form-group row mx-2">
          <label className="col-sm-4 col-form-label">Ngày bán</label>
          <div className="col-sm-8">
            <TextField
              type="text"
              disabled
              className={`form-control-plaintext ${getInputClasses("date")}`}
              {...formik.getFieldProps("date")}
              error={formik.touched.date && formik.errors.date}
              helpertext={formik.errors.date}
            />
          </div>
        </div>
        {/*End::Ngày bán */}

        {/*Begin::Khách hàng */}
        <div className="form-group row mx-2">
          <label className="col-sm-4 col-form-label">Khách hàng</label>
          <div className="col-sm-8">
            <Autocomplete
              options={customerList}
              getOptionLabel={(option) => option.name}
              onChange={(e, option) => onCustomerChange(option)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  variant="outlined"
                  {...formik.getFieldProps("customerId")}
                  error={formik.touched.customerId && formik.errors.customerId}
                  helperText={formik.errors.customerId}
                />
              )}
            />
          </div>
        </div>
        {/*End::Khách hàng */}

        {/*Begin::Tiền nợ */}
        <div className="form-group row mx-2">
          <label className="col-sm-4 col-form-label">Tiền nợ</label>
          <div className="col-sm-8">
            <TextField
              type="text"
              type="number"
              disabled
              className={`form-control-plaintext ${getInputClasses("debt")}`}
              {...formik.getFieldProps("debt")}
              error={formik.errors.debt?.length > 0}
              helperText={formik.errors.debt}></TextField>
          </div>
        </div>
        {/*End::Tiền nợ */}

        {/*Begin::Tổng tiền */}
        <div className="form-group row mx-2">
          <label className="col-sm-4 col-form-label">Tổng tiền</label>
          <div className="col-sm-8">
            <TextField
              type="text"
              disabled
              className={`form-control-plaintext ${getInputClasses("totalPrice")}`}
              {...formik.getFieldProps("totalPrice")}
              error={formik.touched.totalPrice && formik.errors.totalPrice}
              helpertext={formik.errors.totalPrice}
            />
          </div>
        </div>
        {/*End::Tổng tiền */}

        {/*Begin::Khách đưa */}
        <div className="form-group row mx-2">
          <label className="col-sm-4 col-form-label">Khách đưa</label>
          <div className="col-sm-8">
            <Input
              style={{ width: "100%" }}
              size="small"
              type="number"
              variant="outlined"
              className={`form-control ${getInputClasses("paid")}`}
              {...formik.getFieldProps("paid")}
              error={formik.touched.paid && formik.errors.paid}
              helpertext={formik.errors.paid}
            />
          </div>
        </div>
        {/*End::Khách đưa */}

        {/*Begin::Trả khách */}
        <div className="form-group row mx-2">
          <label className="col-sm-4 col-form-label">Trả khách</label>
          <div className="col-sm-8">
            <input
              type="text"
              disabled
              className={`form-control-plaintext ${getInputClasses("change")}`}
              {...formik.getFieldProps("change")}
              error={formik.touched.change && formik.errors.change}
              helpertext={formik.errors.change}
            />
          </div>
        </div>
        {/*End::Trả khách */}

        {/*Begin::Submit */}
        <div className="form-group mx-2">
          <button
            className="form-control btn btn-primary font-weight-bold"
            type="submit"
            onClick={(e) => clickHandler(e)}>
            <span>Thanh toán</span>
          </button>
        </div>
        {/*Enđ::Submit */}
      </form>
    </div>
  );
}

export default PaymentPanel;
