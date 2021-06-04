import React, {useState} from "react";
import { format } from "date-fns";

function PaymentPanel(props) {
  const { orderItemList, total } = props;

  const [customer, setCustomer] = useState("");
  const [customerPaid, setCustomerPaid] = useState(0);
  const [customerReturn, setCustomerReturn] = useState(0);

  const handleCustomerPaid = (event) => {
    const {value} = event.target;
    setCustomerPaid(value);
    setCustomerReturn(value-total);
    console.log(value);
  }
  

  const formattedDate = format(new Date(), "dd/ MM/ yyyy");
  const seller = "admin is admin";
  
  const handleSubmit = () => {
    
  }
  return (
    <div className="card card-custom">
      <div className="card-header">
        <div className="row">
          <h3 className="card-title">Thanh toán</h3>
        </div>
      </div>
      <form className="form fv-plugins-bootstrap fv-plugins-framework" onSubmit={handleSubmit}>
        {/*Begin::Người bán */}
        <div className="form-group row">
          <label className="col-sm-4 col-form-label">Người bán</label>
          <div className="col-sm-8">
            <input
              type="text"
              disabled
              className="form-control-plaintext"
              value={seller}
            />
          </div>
        </div>
        {/*End::Người bán */}

        {/*Begin::Ngày bán */}
        <div className="form-group row">
          <label className="col-sm-4 col-form-label">Ngày bán</label>
          <div className="col-sm-8">
            <input
              type="text"
              disabled
              className="form-control-plaintext"
              value={formattedDate.toString()}
            />
          </div>
        </div>
        {/*End::Ngày bán */}

        {/*Begin::Khách hàng */}
        <div className="form-group row">
          <label className="col-sm-4 col-form-label">
            Khách hàng
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control  form-control-solid"
              placeholder="Khách mua hàng"
              value={customer}
              onChange={(event,value) => setCustomer(value)}
            />
          </div>
        </div>
        {/*End::Khách hàng */}

        {/*Begin::Tổng tiền */}
        <div className="form-group row">
          <label className="col-sm-4 col-form-label">
            Tổng tiền
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              disabled
              className="form-control form-control-solid"
              value={total}
            />
          </div>
        </div>
        {/*End::Tổng tiền */}

        {/*Begin::Khách đưa */}
        <div className="form-group row">
          <label className="col-sm-4 col-form-label">
            Khách đưa
          </label>
          <div className="col-sm-8">
            <input
              type="number"
              className="form-control form-control-solid"
              value={customerPaid}
              onChange={handleCustomerPaid}
            />
          </div>
        </div>
        {/*End::Khách đưa */}

        {/*Begin::Trả khách */}
        <div className="form-group row">
          <label className="col-sm-4 col-form-label">
            Trả khách
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              disabled
              className="form-control form-control-solid"
              value={customerReturn}
            />
          </div>
        </div>
        {/*End::Trả khách */}

        {/*Begin::Submit */}
        <div className="form-group">
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
