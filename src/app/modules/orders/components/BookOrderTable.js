import React, { useState, useEffect } from "react";
import { getAllBooks } from "../../books/js/book";
import CustomTable from '../../../../template/partials/components/CustomTable';

function BookOrderTable({ className }) {

  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    const fetchAllBooks = async () => {
      const { data } = await getAllBooks();
      setBookList(data);
    };
    fetchAllBooks();
  });

  const headerCells = [
    {
      id:"title",
      label:"Tên sách" 
    },
    {
      id:"price",
      label:"Giá bán",
      isCurrency: true
    }
  ];

  return (
    <div>
      <div className={`table-responsive ${className}`}>
        <CustomTable headerCells={headerCells} data={bookList} />
      </div>
    </div>
  );
}

export default BookOrderTable;
