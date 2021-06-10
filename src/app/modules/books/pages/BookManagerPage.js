import React, { useState, useEffect } from "react";
import BookItem from "../components/BookItem";
import { InputAdornment, Toolbar, Grid } from "@material-ui/core";
import {
  Input,
  CustomButton,
  PopUp,
  Notification,
} from "../../../../template/partials/controls";
import { getAllBooks } from "../js/book";
import PageTitle from "../../../../template/layout/components/page-title/PageTitle";
import { LibraryBooks, Search, Add } from "@material-ui/icons";

function BookManagerPage(props) {
  const { className } = props;
  const [filterFunc, setFilterFunc] = useState({
    func: (items) => {
      return items;
    },
  });

  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    const fetchAllBooks = async () => {
      const data = await getAllBooks();
      setBookList(data);
    };
    fetchAllBooks();
  }, []);

  const handleSearch = (event) => {
    let target = event.target;

    setFilterFunc({
      func: (items) => {
        if (target.value === "") return items;
        else
          return items.filter(
            (item) =>
              item.title.toLowerCase().includes(target.value) &&
              item.author.name.toLowerCase().includes(target.value)
          );
      },
    });
  };

  return (
    <div>
      <PageTitle
        title="Quản Lý Sách"
        subTitle="Quản Lý Sách"
        icon={() => <LibraryBooks />}
      />
      <div className={`card card-custom ${className} mt-8`}>
        {/* begin::Header */}
        <div className="card-header border-0 py-5">
          <div className="card-toolbar row w-100 justify-content-between">
            <Input
              onChange={handleSearch}
              label="Search Books"
              className="col-lg-9"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search></Search>
                  </InputAdornment>
                ),
              }}
            ></Input>
            <CustomButton
              text="Thêm Sách"
              variant="outlined"
              startIcon={<Add></Add>}
              className="btn btn-success font-weight-bolder font-size-sm col-lg-2"
            ></CustomButton>
          </div>
        </div>
        {/* end::Header */}

        <div className="d-flex justify-content-center">
          <Grid container spacing={1}>
            {bookList.map((book, index) => (
              <Grid item xs={3} key={index}>
                <BookItem
                  book={book}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default BookManagerPage;
