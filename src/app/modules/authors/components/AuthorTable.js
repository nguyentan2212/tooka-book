import React, { useState, useEffect } from "react";
import { getAllAuthor } from "../js/author";
import CustomTable from "../../../../template/partials/components/CustomTable";
import { ConfirmDialog } from "../../../../template/partials/controls";

function AuthorTable(props) {
  const { filterFunc, setAuthor, setOpenPopUp } = props;

  const [authorsList, setAuthorsList] = useState([]);
  useEffect(() => {
    const fecthData = async () => {
      const { data } = await getAllAuthor();
      setAuthorsList(data);
    };
    fecthData();
  }, []);

  const headerCells = [
    {
      id: "Name",
      label: "Họ Tên",
    },
    {
      id: "PhoneNumber",
      label: "SĐT ",
    },
    {
      id: "Email",
      label: "Email ",
    },
    {
      id: "Address",
      label: "Địa chỉ ",
    },
  ];

  //Confirm Dialog
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const onDelete = (id) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    setAuthorsList(authorsList.filter((author) => author.id != id));
  };

  const deleteHandler = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure to delete this item ?",
      subTitle: "You can't undo this action!",
      onConfirm: () => {
        onDelete(id);
      },
    });
  };

  const updateHandler = (author) => {
    setAuthor(author);
    setOpenPopUp({
      isOpen: false,
      title: "Cập Nhật Tác Giả",
    });
  };
  return (
    <div>
      <div className="table-responsive">
        <CustomTable
          headerCells={headerCells}
          data={authorsList}
          filterFunc={filterFunc}
          hasPaging={true}
          updateHandler={updateHandler}
          deleteHandler={(id) => deleteHandler(id)}
        />
      </div>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      ></ConfirmDialog>
    </div>
  );
}

export default AuthorTable;
