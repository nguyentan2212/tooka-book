import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
} from "@material-ui/core";
import React, { useState } from "react";
import { Close, EditOutlined } from "@material-ui/icons";

function tableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function CustomTable(props) {
  const {
    headerCells,
    data,
    hasPaging,
    filterFunc = {
      func: (items) => {
        return items;
      },
    },
    updateHandler = () => {},
    deleteHandler = () => {},
  } = props;

  const [pages, setPages] = useState([5, 10, 25]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const recordsAfterPagingAndSorting = () => {
    let temp = tableSort(filterFunc.func(data), getComparator(order, orderBy));
    if (hasPaging)
      return temp.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    else return temp;
  };

  const handleSortLabel = (cellID) => {
    const isAsc = orderBy === cellID && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(cellID);
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
      <Table
        className={`table table-head-custom table-head-bg table-borderless table-vertical-center ${classes.table}`}
      >
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            {headerCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                {headCell.disableSorting ? (
                  headCell.label
                ) : (
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={() => {
                      handleSortLabel(headCell.id);
                    }}
                  >
                    {headCell.label}
                  </TableSortLabel>
                )}
              </TableCell>
            ))}
            <TableCell style={{ width: "200px" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && recordsAfterPagingAndSorting().map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              {headerCells.map((headerCell) => (
                <TableCell key={headerCell.id}>
                  {headerCell.isCurrency
                    ? formatter.format(item[headerCell.id])
                    : item[headerCell.id]}
                </TableCell>
              ))}
              <TableCell>
                <a
                  href="#"
                  onClick={() => updateHandler(item)}
                  className="btn btn-light-info font-weight-bolder font-size-sm mx-1"
                >
                  <EditOutlined fontSize="small"></EditOutlined>
                </a>
                <a
                  href="#"
                  onClick={() => deleteHandler(item.id)}
                  className="btn btn-light-danger font-weight-bolder font-size-sm mx-1"
                >
                  <Close fontSize="small"></Close>
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {hasPaging && (
        <TablePagination
          rowsPerPageOptions={pages}
          component="div"
          count={data ? filterFunc.func(data).length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        ></TablePagination>
      )}
    </div>
  );
}

export default CustomTable;
