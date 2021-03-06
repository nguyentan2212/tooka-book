import React, { useState, useEffect } from "react";
import PaymentPanel from "../components/PaymentPanel";
import BookOrderTable from "../components/BookOrderTable";
import PageTitle from "../../../../template/layout/components/page-title/PageTitle";
import { LocalGroceryStore } from "@material-ui/icons";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getAllBooks } from "../../books/js/book";
import { getAllRules } from "../../rules/js/rule";
import { getAllCustomers } from "../../customers/js/customer";
import { toAbsoluteUrl } from "../../../../template/helpers/AssetsHelpers";

function NewOrderPage({ className }) {
  const [bookList, setBookList] = useState([]);
  const [rules, setRules] = useState(null);
  const [customerList, setCustomerList] = useState(null);
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const book = await getAllBooks();
      setBookList(book);
      const tempRules = await getAllRules();
      setRules(tempRules);
      const customers = await getAllCustomers();
      setCustomerList(customers);
    };
    fetchData();
  }, [updated]);

  useEffect(() => {
    setBookList(bookList.filter((book) => book.stock > rules?.LuongTonSauKhiBan));
  },[rules])
  const [total, setTotal] = useState(0);
  const [bookOrderList, setBookOrderList] = useState([]);

  const incAmount = (index, amount) => {
    let tempList = [...bookOrderList];
    let item = tempList[index];
    if (amount > 0 && item.stock - amount >= rules.LuongTonSauKhiBan) {
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
        stock: book.stock,
      },
    ]);
    setTotal(total + book.price);
  };
  const onAddItem = (book) => {
    if (book) {
      const itemIndex = bookOrderList.findIndex((item) => item.id == book.id);
      if (itemIndex < 0) {
        addItem(book);
      }
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
    if (item && value >= 0) {
      item.price = value;
      item.total = item.price * item.amount;
      tempList[index] = item;
      setBookOrderList(tempList);
    }
  };

  var formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return (
    <div>
      <PageTitle title="B??n H??ng" subTitle="B??n H??ng" icon={() => <LocalGroceryStore />} />
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
                    <div className="w-100">
                      <h3 className="text-dark-75 font-weight-bolder font-size-lg">{book.title}</h3>
                      <div className="row w-100">
                        <div className="col-lg-2">
                          <img src={toAbsoluteUrl(book.img)} className="h-50px"></img>
                        </div>
                        <div className="col-lg-3">
                          <p>Th??? lo???i: {book.category.name}</p>
                        </div>
                        <div className="col-lg-3">
                          <p>T??c gi???: {book.author.name}</p>
                        </div>
                        <div className="col-lg-2">
                          <p>H??ng t???n: {book.stock}</p>
                        </div>
                        <div className="col-lg-2">
                          <p>Gi??: {book.price}</p>
                        </div>
                      </div>
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
                {rules && customerList && (
                  <PaymentPanel
                    orderItemList={bookOrderList}
                    rules={rules}
                    customerList={customerList}
                    updated={updated}
                    setUpdated={setUpdated}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer pt-2 pb-3">
          <div className="d-flex justify-content-lg-start">
            <p className="text-warning font-size-lg mr-2">
              *L?????ng t???n sau khi b??n: {rules?.LuongTonSauKhiBan}
            </p>
            <p className="text-warning font-size-lg ml-2">
              *Ti???n n??? t???i ??a: {formatter.format(rules?.TienNoToiDa)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewOrderPage;
