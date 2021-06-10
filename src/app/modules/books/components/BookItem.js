import React, { useState } from "react";
import { Paper, Grid, Typography, ButtonBase } from "@material-ui/core";
import ExtraButton from "./ExtraButton";
import { toAbsoluteUrl } from "../../../../template/helpers/AssetsHelpers";

function BookItem(props) {
  const { book } = props;
  const [ishover, setIshover] = useState(false);

  const handleishover = () => setIshover(!ishover);

  var formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <div>
      <Paper
        onClick={handleishover}
        className="min-w-100 max-w-250px min-h-100 min-h-400px"
      >
        <div className="d-flex flex-column justify-content-center m-2">
          <h4 className="text-center font-weight-bolder mt-2">{book.title}</h4>
          <p className="font-weight-bolder text-center">({book.author.name})</p>
          <p className="font-weight-bolder">Thể loại: {book.category.name}</p>
          <div>
            <ButtonBase className="w-100 h-100">
              <img
                className="d-block w-75 max-h-200"
                alt="complex"
                src={toAbsoluteUrl("/media/books/1.png")}
              />
              <ExtraButton ishover={ishover} />
            </ButtonBase>
          </div>
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
      </Paper>
    </div>
  );
}

export default BookItem;
