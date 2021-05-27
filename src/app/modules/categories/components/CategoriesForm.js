import React, { useState, useEffect } from "react";
import moment from "moment";
import { Grid, makeStyles } from "@material-ui/core";

import {
  CustomButton,
  DatePicker,
  CustomCheckBox,
  DropdownList,
  CustomRadioGroup,
  Input,
} from "../../../../template/partials/controls";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

const genderItems = [
  {
    id: "male",
    title: "Male",
  },
  {
    id: "female",
    title: "Female",
  },
  {
    id: "other",
    title: "Other",
  },
];

const departmentCollections = [
  {
    id: "1",
    title: "Development",
  },
  {
    id: "2",
    title: "Marketing",
  },
  {
    id: "3",
    title: "Accounting",
  },
  {
    id: "4",
    title: "Finnance",
  },
  {
    id: "5",
    title: "HR",
  },
];
const date_create = moment().format("DD-MM-YYYY ");

// ****** Cần làm thêm createdBy bởi user nào ******* (thêm trường userID)

const initialValues = {
  newCategory: "",
  gender: "male",
  departmentID: "", // dùng cho id thể loại của sách (sách có id thể loại mà nó thuộc về)
  dateCreated: date_create, // hiển thị ngày lập
  isPermanent: false, // dùng cho role user dc
  hireDate: new Date(), //dùng cho ngày lập phiếu
};

const CategoriesForm = ({
  openPopUp,
  setOpenPopUp,
  updateCategory,
  setUpdateCategory,
  isDayUpdated,
  notify,
  setNotify,
}) => {
  const [values, setValues] = useState(initialValues);

  const [errors, setErrors] = useState({});

  const classes = useStyles();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
    validate({ [name]: value });
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("newCategory" in fieldValues) {
      temp.newCategory = fieldValues.newCategory
        ? ""
        : "You must enter the category name!";
    }
    if ("departmentID" in fieldValues) {
      temp.departmentID = fieldValues.departmentID
        ? ""
        : "You must choose 1 department";
    }
    setErrors({ ...temp });

    if (fieldValues === values)
      return Object.values(temp).every((value) => value === "");
  };

  useEffect(() => {
    if (updateCategory) setValues({ ...updateCategory });
  }, [updateCategory]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      // window.alert("hello"); // thay alert bằng insert data thành công vào database axios.post (cái này dùng chung cho cả insert lẫn update dùng điều kiện phân nó ra ở đây)

      setUpdateCategory(null);
      resetForm();
      setOpenPopUp(false);
      // thêm set callback để reset categories list
      // setCallback(!callback)
      setNotify({
        isOpen: true,
        message: isDayUpdated
          ? "Updated Successfully !"
          : "Created Successfully",
        type: "success",
      });
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return (
    <div>
      <form className={classes.root} onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={6}>
            <Input
              variant="outlined"
              label="New Category"
              name="newCategory"
              value={values.newCategory}
              onChange={handleChange}
              error={errors.newCategory}
            ></Input>

            <Input
              variant="outlined"
              name="dateCreated"
              label={isDayUpdated ? "Day Updated" : "Date Created"}
              value={values.dateCreated}
              disabled
            ></Input>

            <CustomRadioGroup
              name="gender"
              onChange={handleChange}
              value={values.gender}
              items={genderItems}
              label="Gender"
            ></CustomRadioGroup>
          </Grid>
          <Grid item xs={6}>
            <DropdownList
              name="departmentID"
              label="Department"
              value={values.departmentID}
              onChange={handleChange}
              options={departmentCollections}
              error={errors.departmentID}
            ></DropdownList>
            <DatePicker
              name="hireDate"
              label="Hire Date"
              value={values.hireDate}
              onChange={handleChange}
            ></DatePicker>
            <CustomCheckBox
              name="isPermanent"
              label="Permanent Employee"
              value={values.isPermanent}
              onChange={handleChange}
            ></CustomCheckBox>

            <div className="row w-100 justify-content-center">
              <CustomButton
                className="col-4 form-control btn btn-primary font-weight-bold"
                type="submit"
                text="Submit"
              ></CustomButton>
              <CustomButton
                text="Reset"
                className="col-4 form-control btn btn-secondary font-weight-bold"
                onClick={resetForm}
              ></CustomButton>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CategoriesForm;
