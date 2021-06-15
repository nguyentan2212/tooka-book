import React, { useState, useEffect } from "react";
import moment from "moment";
import ImportTable from "../components/ImportTable";
import { LibraryBooks, Add } from "@material-ui/icons";
import PageTitle from "../../../../template/layout/components/page-title/PageTitle";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getAllBooks } from "../../books/js/book";
import { getAllRules } from "../../rules/js/rule";
import { CustomButton } from "../../../../template/partials/controls";
import { postImport } from "../js/importBook";
import Swal from "sweetalert2";

function ImportBook() {
  const [bookList, setBookList] = useState([]);
  const [rules, setRules] = useState(null);
  const [total, setTotal] = useState(0);
  const [importList, setImportList] = useState([]);

  const currentDate = moment().format("DD/MM/YYYY");
  var formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  useEffect(() => {
    const fetchData = async () => {
      const book = await getAllBooks();
      setBookList(book);
      const tempRules = await getAllRules();
      setRules(tempRules);
    };
    fetchData();
  }, []);

  const incAmount = (index, amount) => {
    let tempList = [...importList];
    let item = tempList[index];

    item.amount = amount;
    item.total = item.price * item.amount;
    tempList[index] = item;
    setImportList(tempList);
  };

  const addItem = (book) => {
    setImportList((importList) => [
      ...importList,
      {
        id: book.id,
        amount: rules?.LuongNhapToiThieu,
        price: book.price,
        totalPrice: book.price,
        title: book.title,
        stock: book.stock,
      },
    ]);
  };

  const amountChangeHandler = (index, target) => {
    incAmount(index, parseInt(target.value));
  };

  const priceChangeHandler = (index, target) => {
    let tempList = [...importList];
    let item = tempList[index];

    item.price = target.value;
    item.total = item.price * item.amount;
    tempList[index] = item;
    setImportList(tempList);
  };

  const onAddItem = (book) => {
    if (book) {
      const itemIndex = importList.findIndex((item) => item.id == book.id);
      if (itemIndex < 0) {
        addItem(book);
      }
    }
  };

  const onDelete = (id) => {
    setImportList(importList.filter((order) => order.id != id));
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      const result = importList.reduce((total, item) => {
        return total + item.price * item.amount;
      }, 0);
      return result;
    };
    setTotal(calculateTotalPrice());
  }, [importList]);

  const isValid = () => {
    for (let i = 0; i < importList?.length; i++) {
      if (
        importList[i].amount < rules.LuongNhapToiThieu ||
        importList[i].price < 0
      ) {
        return false;
      }
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
        let temp = {
            total: total,
            items: importList,
        };
        postImport(temp).then((result) => {
            if (result.status === 200){
                Swal.fire({
                    title: "Thông báo",
                    text: "Nhập hàng thành công",
                    icon: "success",
                })
            }
        }).catch((e) => {
            Swal.fire({
              icon: "error",
              title: "Oops...Nhập hàng thất bại!",
              text: `Error: ${e.message}`,
            });
            console.log("error");
          });
    }
  };
  return (
    <div>
      <PageTitle
        title="Nhập Hàng"
        subTitle="Nhập Hàng"
        icon={() => <LibraryBooks />}
      />
      <div className="card card-custom mt-8">
        <div className="card-body py-3 mt-2">
          <div className="card-toolbar row w-100 justify-content-between">
            <Autocomplete
              className="col-lg-10"
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
            <CustomButton
              text="Thêm sách mới"
              variant="outlined"
              startIcon={<Add></Add>}
              className="btn btn-success font-weight-bolder font-size-sm"
            ></CustomButton>
          </div>
        </div>
        <div className="card-body pt-0 pb-3">
          <ImportTable
            importList={importList}
            amountChangeHandler={amountChangeHandler}
            priceChangeHandler={priceChangeHandler}
            onDelete={onDelete}
            rules={rules}
          />
        </div>
        <form>
          <div className="d-flex justify-content-lg-between pt-0 pb-3 mx-10">
            <p className="text-dark-75 font-weight-bolder font-size-lg">
              Ngày nhập: {currentDate}
            </p>
            <p className="text-dark-75 font-weight-bolder font-size-lg">
              Tổng tiền: {formatter.format(total)}
            </p>
            <button
              className="btn btn-primary font-weight-bold"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              <span>Thanh toán</span>
            </button>
          </div>
        </form>
        <div className="card-footer pt-2 pb-3">
          <div className="d-flex justify-content-lg-start">
            <p className="text-warning font-size-lg mr-2">
              *Lượng nhập tối thiểu: {rules?.LuongNhapToiThieu}
            </p>
            <p className="text-warning font-size-lg ml-2">
              *Lượng tồn trước khi nhập: {rules?.LuongTonTruocKhiNhap}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImportBook;
