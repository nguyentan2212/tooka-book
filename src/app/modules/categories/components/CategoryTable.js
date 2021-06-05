import React, { useState, useEffect } from "react";
import { getAllCategories } from "../js/category";
import CustomTable from "../../../../template/partials/components/CustomTable";
import { ConfirmDialog } from "../../../../template/partials/controls";
function CategoryTable(props) {
  const { filterFunc, setCategory, setOpenPopUp } = props;

  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    const fecthData = async () => {
      const data = await getAllCategories();
      setCategoryList(data);
      console.log(data);
    };
    fecthData();
  }, []);

  const headerCells = [
    {
      id: "name",
      label: "Name",
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
    setCategoryList(categoryList.filter((category) => category.id != id));
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
    setCategory(author);
    setOpenPopUp({
      isOpen: true,
      title: "Bảng Cập Nhật Thể Loại",
    });
  };
  return (
    <div>
      <div className="table-responsive">
        <CustomTable
          headerCells={headerCells}
          data={categoryList}
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

export default CategoryTable;
