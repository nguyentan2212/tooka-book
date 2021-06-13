import React, { useState } from "react";
import { Paper, ButtonBase } from "@material-ui/core";
import ExtraButton from "./ExtraButton";
import { toAbsoluteUrl } from "../../../../template/helpers/AssetsHelpers";
import UpdateBookForm from "./UpdateBookForm";
import { PopUp } from "../../../../template/partials/controls";

function BookItem(props) {
  const { book, updated, setUpdated } = props;
  const [ishover, setIshover] = useState(false);
  
  const handleishover = () => setIshover(!ishover);

  var formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const [openPopUp, setOpenPopUp] = useState({
    isOpen: false,
    title: "Thêm Sách Mới",
  });

  const clickHandler = () => {
    setOpenPopUp({
      isOpen: true,
      title: "Cập nhật sách",
    });
  };
  return (
    <div className="h-100">
      <Paper onClick={handleishover} className="min-w-100 max-w-250px min-h-400px">
        <div className="d-flex flex-column justify-content-between m-2 h-100">
          <div>
            <h4 className="text-center font-weight-bolder mt-2">
              {book.title}
            </h4>
            <p className="font-weight-bolder text-center">
              ({book.author.name})
            </p>
            <p className="font-weight-bolder">Thể loại: {book.category.name}</p>
          </div>
          <div>
            <ButtonBase className="w-100 h-100">
              <img
                className="d-block w-75 max-h-200px"
                alt="complex"
                src={toAbsoluteUrl(book.img ? book.img : "/media/books/1.png")}
              />
              <ExtraButton ishover={ishover} clickHandler={clickHandler} />
            </ButtonBase>
          </div>
          <div>
            <div className="d-flex mt-1">
              <p className="font-weight-bolder mr-1">NXB:</p>{" "}
              <p>{book.publisher}</p>
            </div>
            <div className="d-flex">
              <p className="font-weight-bolder mr-1">Năm xuất bản:</p>
              <p>{book.publishYear}</p>
            </div>
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <p className="font-weight-bolder mr-1">Giá:</p>{" "}
                <p>{formatter.format(book.price)}</p>
              </div>
              <div className="d-flex">
                <p className="font-weight-bolder mr-1">Tồn kho:</p>
                <p>{book.stock} cuốn</p>
              </div>
            </div>
          </div>
        </div>
      </Paper>
      <PopUp
        openPopUp={openPopUp}
        setOpenPopUp={setOpenPopUp}
        title={openPopUp.title}
      >
        <UpdateBookForm
          book={book}
          updated={updated}
          setUpdated={setUpdated}
        ></UpdateBookForm>
      </PopUp>
    </div>
  );
}

export default BookItem;
