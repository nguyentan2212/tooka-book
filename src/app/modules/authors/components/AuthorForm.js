import React, { useState, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import {
  Input,
  CustomButton
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
  Name: "",
  PhoneNumber: "",
  Email: "",
  Address: "",
};

function AuthorForm(props) {
  const { author, setAuthor, setOpenPopUp } = props;

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
      temp.name =
        fieldValues.name.length > 0 ? "" : "Xin hãy nhập tên hoặc bút danh!";
    }
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Vui lòng nhập địa chỉ hợp lệ.";
    if ("phoneNumber" in fieldValues) {
      temp.phoneNumber =
        fieldValues.phoneNumber.length > 9
          ? ""
          : "Xin hãy nhập số điện thoại liên lạc hợp lệ có it nhất 10 số";
    }
    setErrors({ ...temp });

    if (fieldValues === values)
      return Object.values(temp).every((value) => value === "");
  };

  useEffect(() => {
    if (author) setValues({ ...author });
  }, [author]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      resetForm();
      setOpenPopUp({
        isOpen: false,
        title: "Cập Nhật Tác Giả",
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
              label="Họ tên"
              name="Name"
              value={values.name}
              onChange={handleChange}
              error={errors.name}
            ></Input>
            <Input
              variant="outlined"
              label="Địa chỉ Email"
              name="Email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
            ></Input>
          </Grid>
          <Grid item xs={6}>
            <Input
              variant="outlined"
              label="Số điện thoại"
              name="Phone"
              value={values.phoneNumber}
              onChange={handleChange}
              error={errors.phoneNumber}
            ></Input>
            <Input
              variant="outlined"
              label="Địa chỉ"
              name="Address"
              value={values.address}
              onChange={handleChange}
              error={errors.address}
            ></Input>
            <div className="row w-100 justify-content-center">
              <CustomButton
                className="col-4 form-control btn btn-primary font-weight-bold"
                type="submit"
                text="Xác nhận"
              ></CustomButton>
              <CustomButton
                text="Đặt lại"
                color="default"
                className="col-4 form-control btn btn-secondary font-weight-bold"
                onClick={resetForm}
              ></CustomButton>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default AuthorForm;
