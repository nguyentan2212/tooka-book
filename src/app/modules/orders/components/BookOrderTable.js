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

import { ConfirmDialog } from "../../../../template/partials/controls";

function BookOrderTable(props) {
  const { amountChangeHandler, priceChangeHandler, bookOrderList, onDelete } =
    props;

  const headerCells = [
    {
      id: "title",
      label: "Tên sách",
    },
    {
      id: "amount",
      label: "Số lượng",
    },
    {
      id: "price",
      label: "Giá bán",
      isCurrency: true,
    },
    {
      id: "total",
      label: "Tổng tiền",
      isCurrency: true,
    },
  ];

  //Confirm Dialog
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const deleteHandler = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure to delete this item ?",
      subTitle: "You can't undo this action!",
      onConfirm: () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        onDelete(id);
      },
    });
  };

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

  const classes = useStyles();

  var formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <div>
      <div className="table-responsive">
        <Table
          className={`table table-head-custom table-head-bg table-borderless table-vertical-center ${classes.table}`}
        >
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
            {bookOrderList &&
              bookOrderList.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      style={{ maxWidth: "125px" }}
                      type="number"
                      variant="outlined"
                      value={item.amount}
                      onChange={(e) =>
                        amountChangeHandler(index, e.target.value)
                      }
                    ></TextField>
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      style={{ maxWidth: "125px" }}
                      type="number"
                      variant="outlined"
                      value={item.price}
                      onChange={(e) =>
                        priceChangeHandler(index, e.target.value)
                      }
                    ></TextField>
                  </TableCell>
                  <TableCell>{formatter.format(item.total)}</TableCell>
                  <TableCell className="text-center">
                    <a
                      href="#"
                      onClick={() => deleteHandler(item.id)}
                      className="btn btn-light-danger font-weight-bolder font-size-sm "
                    >
                      <Close fontSize="small"></Close>
                    </a>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        ></ConfirmDialog>
      </div>
    </div>
  );
}

export default BookOrderTable;
