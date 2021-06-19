import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { Close, EditOutlined } from "@material-ui/icons";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
}));

const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

function ImportTable(props) {
  const { amountChangeHandler, priceChangeHandler, importList, onDelete, rules } = props;

  const classes = useStyles();

  const headerCells = [
    {
      id: "title",
      label: "Tên sách",
    },
    {
      id: "stock",
      label: "Tồn kho",
    },
    {
      id: "amount",
      label: "Số lượng",
    },
    {
      id: "price",
      label: "Giá nhập",
    },
    {
      id: "totalPrice",
      label: "Tổng tiền",
    },
  ];

  const deleteConfirm = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success ml-2",
      cancelButton: "btn btn-danger mr-2",
    },
    buttonsStyling: false,
  });

  const deleteHandler = (id) => {
    deleteConfirm
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteConfirm.fire("Deleted!", "Your file has been deleted.", "success");
          onDelete(id);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          deleteConfirm.fire("Cancelled", "Your imaginary file is safe :)", "error");
        }
      });
  };

  const isValid = (item, path) => {
    if (path == "amount") {
      if (item.amount < rules.LuongNhapToiThieu) {
        return `Không được nhập ít hơn ${rules.LuongNhapToiThieu}`;
      }
    } else if (item.price < 0) {
      return "Tối thiểu là 0đ";
    }

    return null;
  };

  return (
    <div className="table-responsive">
      <Table
        className={`table table-head-custom table-head-bg table-borderless table-vertical-center ${classes.table}`}>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            {headerCells.map((headCell) => (
              <TableCell key={headCell.id}>{headCell.label}</TableCell>
            ))}
            <TableCell style={{ width: "100px" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {importList &&
            importList.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    style={{ maxWidth: "125px" }}
                    type="number"
                    variant="outlined"
                    value={item.amount}
                    onChange={(e) => amountChangeHandler(index, e.target)}
                    error={isValid(item, "amount") ? true : false}
                    helperText={isValid(item, "amount")}></TextField>
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    style={{ maxWidth: "125px" }}
                    type="number"
                    variant="outlined"
                    value={item.price}
                    onChange={(e) => priceChangeHandler(index, e.target)}
                    error={isValid(item, "price") ? true : false}
                    helperText={isValid(item, "price")}></TextField>
                </TableCell>
                <TableCell>{formatter.format(item.totalPrice)}</TableCell>
                <TableCell className="text-center">
                  <a
                    href="#"
                    onClick={() => deleteHandler(item.id)}
                    className="btn btn-light-danger font-weight-bolder font-size-sm ">
                    <Close fontSize="small"></Close>
                  </a>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ImportTable;
