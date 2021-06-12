import React, { useState, useEffect } from "react";
import BookItem from "../components/BookItem";
import { InputAdornment, Toolbar, Grid } from "@material-ui/core";
import {
  Input,
  CustomButton,
  PopUp,
} from "../../../../template/partials/controls";
import { getAllBooks } from "../js/book";
import PageTitle from "../../../../template/layout/components/page-title/PageTitle";
import { LibraryBooks, Search, Add } from "@material-ui/icons";
import AddBookForm from "../components/AddBookForm";

function BookManagerPage(props) {
  const { className } = props;
  const [filterFunc, setFilterFunc] = useState({
    func: (items) => {
      return items;
    },
  });

  const [updated, setUpdated] = useState(0);

  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    const fetchAllBooks = async () => {
      const data = await getAllBooks();
      setBookList(data);
    };
    fetchAllBooks();
  }, [updated]);

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

  const [openPopUp, setOpenPopUp] = useState({
    isOpen: false,
    title: "Thêm Sách Mới",
  });

  const onCreateBook = () => {
    setOpenPopUp({
      isOpen: true,
      title: "Thêm Sách Mới",
    });
  }
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
              onClick={onCreateBook}
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
          <PopUp
              openPopUp={openPopUp}
              setOpenPopUp={setOpenPopUp}
              title={openPopUp.title}
            >
              <AddBookForm
                updated={updated}
                setUpdated={setUpdated}
              ></AddBookForm>
            </PopUp>
        </div>
      </div>
    </div>
  );
}

export default BookManagerPage;
