import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { getAllOrders } from "../js/order";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";

function OrderTable() {
  const [ordersList, setOrdersList] = useState([]);
  useEffect(() => {
    const fecthData = async () => {
      const { data } = await getAllOrders();
      setOrdersList(data);
    };
    fecthData();
  }, []);
  return (
    <div>
      <div className="table-responsive">
        <Table className="table table-head-custom table-head-bg table-borderless table-vertical-center">
          <TableHead>
            <TableRow className="text-left text-uppercase">
              <TableCell style={{ minWidth: "30px" }}>#</TableCell>
              <TableCell style={{ minWidth: "170px" }}>Khách hàng</TableCell>
              <TableCell style={{ minWidth: "170px" }}>Ngày bán</TableCell>
              <TableCell style={{ minWidth: "170px" }}>Tổng tiền</TableCell>
              <TableCell style={{ minWidth: "170px" }}>Khách đưa</TableCell>
              <TableCell style={{ minWidth: "170px" }}>Tiền thừa</TableCell>
              <TableCell style={{ minWidth: "170px" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersList.map((item, index) => {
              var formattedDate = format(new Date(), "dd/ MM/ yyyy");
              var formatter = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "VND",
              });
              return (
                <TableRow key={index}>
                  <TableCell className="py-8 text-dark-75 font-weight-bolder font-size-lg">
                    {index + 1}
                  </TableCell>
                  <TableCell className="text-dark-75 font-weight-bolder font-size-lg">
                    {item.customer}
                  </TableCell>
                  <TableCell className="text-dark-75 font-weight-bolder font-size-lg">
                    {formattedDate}
                  </TableCell>
                  <TableCell className="text-dark-75 font-weight-bolder font-size-lg">
                    {formatter.format(item.total)}
                  </TableCell>
                  <TableCell className="text-dark-75 font-weight-bolder font-size-lg">
                    {formatter.format(item.customerPaid)}
                  </TableCell>
                  <TableCell className="text-dark-75 font-weight-bolder font-size-lg">
                    {formatter.format(item.returnCustomer)}
                  </TableCell>
                  <TableCell className="text-right">
                    <a
                      href="#"
                      className="btn btn-light-success font-weight-bolder font-size-sm mr-1"
                    >
                      Chi tiết
                    </a>
                    <a
                      href="#"
                      className="btn btn-light-info font-weight-bolder font-size-sm mx-1"
                    >
                      Cập nhật
                    </a>
                    <a
                      href="#"
                      className="btn btn-light-danger font-weight-bolder font-size-sm mx-1"
                    >
                      Xóa
                    </a>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default OrderTable;
