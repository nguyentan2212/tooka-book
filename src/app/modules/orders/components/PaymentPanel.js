import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import { getAllCustomers } from "../../customers/js/customer";
import { getToken } from "../../../js/utilities/token";

function PaymentPanel(props) {
  const { orderItemList } = props;

  const formattedDate = format(new Date(), "dd/ MM/ yyyy");
  const seller = "admin is admin";

  const [customerList, setCustomerList] = useState([]);

  const user = getToken();

  const [paymentInfo, setPaymentInfo] = useState({
    seller: user.username,
    date: formattedDate,
    customerId: 0,
    totalPrice: 0,
    dept: 0,
    paid: 0,
    change: 0,
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      const result = await getAllCustomers();
      setCustomerList(result);
    };
    fetchCustomers();
    console.log(paymentInfo);
  }, [paymentInfo]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const result = orderItemList.reduce((total, item) => {
        return total + item.price * item.amount;
      }, 0);
      return result;
    };
    let total = calculateTotalPrice();
    setPaymentInfo({
      ...paymentInfo,
      totalPrice: total,
      change: paymentInfo.paid - total - paymentInfo.dept,
    });
  }, [orderItemList]);

  const onChangeCustomer = (customer) => {
    if (customer) {
      setPaymentInfo({ ...paymentInfo, customerId: customer.id });
    }
  };

  const onPaidChange = (even) => {
    let target = even.target;
    if (target) {
      const value = target.value;
      setPaymentInfo({
        ...paymentInfo,
        paid: value,
        change: value - paymentInfo.totalPrice - paymentInfo.dept,
      });
    }
  };

  var formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const handleSubmit = () => {};
  return (
    <div className="card card-custom">
      <div className="card-header">
        <div className="row">
          <h3 className="card-title">Thanh toán</h3>
        </div>
      </div>
      <form
        className="form fv-plugins-bootstrap fv-plugins-framework"
        onSubmit={handleSubmit}
      >
        {/*Begin::Người bán */}
        <div className="form-group row mx-2">
          <label className="col-sm-4 col-form-label">Người bán</label>
          <div className="col-sm-8">
            <input
              type="text"
              disabled
              className="form-control-plaintext"
              value={paymentInfo.seller}
            />
          </div>
        </div>
        {/*End::Người bán */}

        {/*Begin::Ngày bán */}
        <div className="form-group row mx-2">
          <label className="col-sm-4 col-form-label">Ngày bán</label>
          <div className="col-sm-8">
            <input
              type="text"
              disabled
              className="form-control-plaintext"
              value={paymentInfo.date.toString()}
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
              onChange={(event, customer) => onChangeCustomer(customer)}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} size="small" variant="outlined" />
              )}
            />
          </div>
        </div>
        {/*End::Khách hàng */}

        {/*Begin::Tổng tiền */}
        <div className="form-group row mx-2">
          <label className="col-sm-4 col-form-label">Tổng tiền</label>
          <div className="col-sm-8">
            <input
              type="text"
              disabled
              className="form-control-plaintext"
              value={formatter.format(paymentInfo.totalPrice)}
            />
          </div>
        </div>
        {/*End::Tổng tiền */}

        {/*Begin::Tiền nợ */}
        <div className="form-group row mx-2">
          <label className="col-sm-4 col-form-label">Tiền nợ</label>
          <div className="col-sm-8">
            <input
              type="text"
              disabled
              className="form-control-plaintext"
              value={formatter.format(paymentInfo.dept)}
            />
          </div>
        </div>
        {/*End::Tiền nợ */}

        {/*Begin::Khách đưa */}
        <div className="form-group row mx-2">
          <label className="col-sm-4 col-form-label">Khách đưa</label>
          <div className="col-sm-8">
            <TextField
              style={{ width: "100%" }}
              size="small"
              type="number"
              variant="outlined"
              value={paymentInfo.paid}
              onChange={onPaidChange}
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
              className="form-control-plaintext"
              value={formatter.format(paymentInfo.change)}
            />
          </div>
        </div>
        {/*End::Trả khách */}

        {/*Begin::Submit */}
        <div className="form-group mx-2">
          <button
            className="form-control btn btn-primary font-weight-bold"
            type="submit"
          >
            <span>Thanh toán</span>
          </button>
        </div>
        {/*Enđ::Submit */}
      </form>
    </div>
  );
}

export default PaymentPanel;
