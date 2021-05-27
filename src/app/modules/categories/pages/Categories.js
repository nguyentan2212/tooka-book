import {
  InputAdornment,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Paper,
} from "@material-ui/core";
import React, { useState } from "react";
import CategoriesForm from "../components/CategoriesForm";
import PageTitle from "../../../../template/layout/components/page-title/PageTitle";

import {Input, CustomButton, PopUp, Notification, ConfirmDialog} from '../../../../template/partials/controls';

import {Close, EditOutlined, Search, Add, Category} from "@material-ui/icons";

const Categories = () => {
  const [pages, setPages] = useState([5, 10, 25]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [filterFunc, setFilterFunc] = useState({
    func: (items) => {
      return items;
    },
  });

  //Popup modal
  const [openPopUp, setOpenPopUp] = useState(false);

  // control việc display cái chữ date created khi tạo và khi update thì nó là day updated
  const [isDayUpdated, setIsDayUpdated] = useState(false);

  //Notification
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  //Confirm Dialog
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  //chứa category được update
  const [updateCategory, setUpdateCategory] = useState(null);

  const [categories, setCategories] = useState([
    {
      id: 1,
      newCategory: "sach thuyet trinh",
      departmentID: 1,
    },
    {
      id: 2,
      newCategory: "sach thuyet minh",
      departmentID: 2,
    },
    {
      id: 3,
      newCategory: "phieu luu",
      departmentID: 3,
    },
    {
      id: 4,
      newCategory: "phieu be ngoan",
      departmentID: 4,
    },
    {
      id: 5,
      newCategory: "trinh tham",
    },
    {
      id: 6,
      newCategory: "tham hiem",
      departmentID: 5,
    },
    {
      id: 7,
      newCategory: "kinh di ",
      departmentID: 1,
    },
    {
      id: 8,
      newCategory: "hai huoc ",
      departmentID: 2,
    },
  ]);

  const headCells = [
    {
      id: "index",
      label: "Index",
      disableSorting: true,
    },

    {
      id: "id",
      label: "Category ID",
    },
    {
      id: "name",
      label: "Name",
    },
    {
      id: "created day",
      label: "Created Day ",
    },
    {
      id: "actions",
      label: "Actions ",
      disableSorting: true,
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  const handleSearch = (event) => {
    let target = event.target;
    setFilterFunc({
      func: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((item) =>
            item.name.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const recordsAfterPagingAndSorting = () => {
    return tableSort(
      filterFunc.func(categories),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  const handleSortLabel = (cellID) => {
    const isAsc = orderBy === cellID && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(cellID);
  };

  const openInPopUp = (category) => {
    setUpdateCategory(category);
    setOpenPopUp(true);
  };

  //delete một thể loại (dùng axios)
  const onDelete = (categoryID) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });

    //======xóa
    //  axios.delete()

    //===== refresh lại list
    //  setCallback(!callback);

    setNotify({
      isOpen: true,
      message: "Deleted Successfully!",
      type: "error",
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
    pageContent: {
      marginTop: theme.spacing(3),
      padding: theme.spacing(3),
    }
  }));

  const classes = useStyles();

  return (
    <div>
      <PageTitle
        title="Quản Lý Thể Loại"
        subTitle="Quản Lý Thể Loại"
        icon={() => <Category />}
      />
      {/* Categories List */}
      <Paper className={classes.pageContent}>
        <Toolbar>
          <div className="row w-100 justify-content-between">
            <Input
              onChange={handleSearch}
              label="Search Categories"
              className="col-9"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search></Search>
                  </InputAdornment>
                ),
              }}
            ></Input>
            <CustomButton
              text="Add New"
              variant="outlined"
              startIcon={<Add></Add>}
              className="col-2"
              onClick={() => {
                setOpenPopUp(true);
                setIsDayUpdated(false);
                setUpdateCategory(null);
              }}
            ></CustomButton>
          </div>
        </Toolbar>

        <Table
          className={`table table-head-custom table-head-bg table-borderless table-vertical-center ${classes.table}`}
        >
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
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
            </TableRow>
          </TableHead>
          <TableBody>
            {recordsAfterPagingAndSorting().map((category, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.newCategory}</TableCell>
                <TableCell>13/5/2021</TableCell>
                <TableCell>
                  <a
                    href="#"
                    className="btn btn-light-info font-weight-bolder font-size-sm mx-1"
                    onClick={() => {
                      openInPopUp(category);
                      setIsDayUpdated(true);
                    }}
                  >
                    <EditOutlined fontSize="small"></EditOutlined>
                  </a>
                  <a
                    href="#"
                    className="btn btn-light-danger font-weight-bolder font-size-sm mx-1"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: "Are you sure to delete this category?",
                        subTitle: "You can't undo this action!",
                        onConfirm: () => {
                          onDelete(category.id);
                        },
                      });
                    }}
                  >
                    <Close fontSize="small"></Close>
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={pages}
          component="div"
          count={categories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        ></TablePagination>
      </Paper>
      <PopUp
        openPopUp={openPopUp}
        setOpenPopUp={setOpenPopUp}
        title="Category Form"
      >
        <CategoriesForm
          openPopUp={openPopUp}
          setOpenPopUp={setOpenPopUp}
          updateCategory={updateCategory}
          setUpdateCategory={setUpdateCategory}
          isDayUpdated={isDayUpdated}
          notify={notify}
          setNotify={setNotify}
        ></CategoriesForm>
      </PopUp>
      <Notification notify={notify} setNotify={setNotify}></Notification>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      ></ConfirmDialog>
    </div>
  );
};

export default Categories;
