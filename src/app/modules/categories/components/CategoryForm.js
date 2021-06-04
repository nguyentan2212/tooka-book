import React, { useState, useEffect } from "react";
import moment from "moment";
import { Grid, makeStyles } from "@material-ui/core";

import {
  CustomButton,
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

const initialValues = {
  name: "",
};

const CategoryForm = (props) => {
  const { category, setCategory, setOpenPopUp } = props;

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
    if ("name" in fieldValues) {
      temp.name = fieldValues.name
        ? ""
        : "You must enter the category name!";
    }
    setErrors({ ...temp });

    if (fieldValues === values)
      return Object.values(temp).every((value) => value === "");
  };

  useEffect(() => {
    if (category) setValues({ ...category });
  }, [category]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      resetForm();
      setOpenPopUp({
        isOpen: false,
        title: "Bảng Cập Nhật Thể Loại",
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
          <Grid item>
            <Input
              variant="outlined"
              label="Category Name"
              name="newCategory"
              value={values.name}
              onChange={handleChange}
              error={errors.name}
            ></Input>
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

export default CategoryForm;
