import React from "react";
import { format } from "date-fns";

function PaymentPanel({ className }) {
  var formattedDate = format(new Date(), "dd/ MM/ yyyy");
  const seller = "admin is admin";
  var customer = "";
  var total = 1000;
  var customerPaid = 5000;
  var customerReturn = customerPaid - total;
  return (
    <div className="card card-custom">
      <div className="card-header">
        <div className="row">
          <h3 className="card-title">Thanh toán</h3>
        </div>
      </div>
      <form className="form fv-plugins-bootstrap fv-plugins-framework">
        {/*Begin::Người bán */}
        <div class="form-group row">
          <label class="col-sm-4 col-form-label">Người bán</label>
          <div class="col-sm-8">
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              value={seller}
            />
          </div>
        </div>
        {/*End::Người bán */}

        {/*Begin::Ngày bán */}
        <div class="form-group row">
          <label class="col-sm-4 col-form-label">Ngày bán</label>
          <div class="col-sm-8">
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              value={formattedDate.toString()}
            />
          </div>
        </div>
        {/*End::Ngày bán */}

        {/*Begin::Khách hàng */}
        <div class="form-group row">
          <label for="sellerName" class="col-sm-4 col-form-label">
            Khách hàng
          </label>
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control  form-control-solid"
              placeholder="Khách mua hàng"
              value={customer}
            />
          </div>
        </div>
        {/*End::Khách hàng */}

        {/*Begin::Tổng tiền */}
        <div class="form-group row">
          <label for="sellerName" class="col-sm-4 col-form-label">
            Tổng tiền
          </label>
          <div class="col-sm-8">
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              value={total}
            />
          </div>
        </div>
        {/*End::Tổng tiền */}

        {/*Begin::Khách đưa */}
        <div class="form-group row">
          <label for="sellerName" class="col-sm-4 col-form-label">
            Khách đưa
          </label>
          <div class="col-sm-8">
            <input
              type="number"
              class="form-control form-control-solid"
              value={customerPaid}
            />
          </div>
        </div>
        {/*End::Khách đưa */}

        {/*Begin::Trả khách */}
        <div class="form-group row">
          <label for="sellerName" class="col-sm-4 col-form-label">
            Trả khách
          </label>
          <div class="col-sm-8">
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              value={customerReturn}
            />
          </div>
        </div>
        {/*End::Trả khách */}

        {/*Begin::Submit */}
        <div class="form-group">
            <button className="form-control btn btn-primary font-weight-bold" type="submit">
            <span>Thanh toán</span>
            </button>
        </div>
        {/*Enđ::Submit */}
      </form>
    </div>
  );
}

export default PaymentPanel;
