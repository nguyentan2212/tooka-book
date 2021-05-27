import React, { useState, useEffect } from "react";
import PaymentPanel from '../components/PaymentPanel';
import BookOrderTable from "../components/BookOrderTable";

function NewOrderPage({ className }) {

  return (
    <div className={`card card-custom ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 py-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label font-weight-bolder text-dark">
              Bán hàng
            </span>
          </h3>
        </div>
      {/* end::Header */}
      {/* Body */}
      <div className="card-body pt-0 pb-3">
          <div className="tab-content">
              <div className="row">
                  <div className="col-lg-6 col-xxl-8">
                      <BookOrderTable />
                  </div>
                  <div className="col-lg-6 col-xxl-4">
                      <PaymentPanel />
                  </div>
              </div>
          </div>
        </div>
    </div>
  );
}

export default NewOrderPage;
