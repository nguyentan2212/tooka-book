import React, { useState, useEffect } from "react";
import PaymentPanel from "../components/PaymentPanel";
import BookOrderTable from "../components/BookOrderTable";
import PageTitle from "../../../../template/layout/components/page-title/PageTitle";
import { LibraryBooks } from "@material-ui/icons";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getAllBooks } from "../../books/js/book";

function NewOrderPage({ className }) {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      const data = await getAllBooks();
      setBookList(data);
    };
    fetchAllBooks();
  }, []);

  const [total, setTotal] = useState(0);
  const [bookOrderList, setBookOrderList] = useState([]);

  const incAmount = (index, amount) => {
    console.log(index, amount);
    if (amount > 0) {
      let tempList = [...bookOrderList];
      let item = tempList[index];
      item.amount = amount;
      item.total = item.price * item.amount;
      tempList[index] = item;
      setBookOrderList(tempList);
    }
  };

  const addItem = (book) => {
    setBookOrderList((bookOrderList) => [
      ...bookOrderList,
      {
        id: book.id,
        title: book.title,
        amount: 1,
        price: book.price,
        total: book.price,
      },
    ]);
  };
  const onAddItem = (book) => {
    if (book) {
      const itemIndex = bookOrderList.findIndex((item) => item.id == book.id);
      if (itemIndex < 0) {
        addItem(book);
      }
      setTotal(total + book.price);
    }
  };

  const onDelete = (id) => {
    let item = bookOrderList.find((element) => element.id == id);
    setTotal(total - item.price * item.amount);
    setBookOrderList(bookOrderList.filter((order) => order.id != id));
  };

  const amountChangeHandler = (index, value) => {
    incAmount(index, parseInt(value));
  };

  const priceChangeHandler = (index, value) => {
    let tempList = [...bookOrderList];
    let item = tempList[index];
    item.price = value;
    item.total = item.price * item.amount;
    tempList[index] = item;
    setBookOrderList(tempList);
  };
  return (
    <div>
      <PageTitle
        title="Bán Hàng"
        subTitle="Bán Hàng"
        icon={() => <LibraryBooks />}
      />
      <div className={`card card-custom mt-8 ${className}`}>
        <div className="card-body py-3 mt-2">
          <div className="tab-content">
            <div className="row">
              <div className="col-lg-8 col-xxl-8">
                <Autocomplete
                  className="w-100"
                  options={bookList}
                  autoHighlight
                  onChange={(event, book) => onAddItem(book)}
                  getOptionLabel={(option) => option.title}
                  renderOption={(book) => (
                    <div>
                      <h3 className="text-dark-75 font-weight-bolder font-size-lg">
                        {book.title}
                      </h3>
                      <p>Thể loại: {book.category.name}</p>
                      <p>Tác giả: {book.author.name}</p>
                      <p>Hàng tồn: {book.stock}</p>
                      <p>Giá: {book.price}</p>
                    </div>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={"Search book"}
                      variant="outlined"
                      InputProps={{ ...params.InputProps }}
                    />
                  )}
                />
                <BookOrderTable
                  bookOrderList={bookOrderList}
                  amountChangeHandler={amountChangeHandler}
                  priceChangeHandler={priceChangeHandler}
                  onDelete={onDelete}
                />
              </div>
              <div className="col-lg-4 col-xxl-4">
                <PaymentPanel orderItemList={bookOrderList} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewOrderPage;
