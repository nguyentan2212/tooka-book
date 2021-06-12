import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { Input, CustomButton } from "../../../../template/partials/controls";
import { postCustomer } from "../js/customer";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

function CustomerForm(props) {
  const { updated, setUpdated } = props;
  const classes = useStyles();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().required("Không được để trống"),
    email: Yup.string()
      .email("Sai định dạng email")
      .required("Không được để trống"),
    address: Yup.string().required("Không được để trống"),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, "Sai định dạng số điện thoại")
      .required("Không được để trống"),
  });

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const initialValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      postCustomer(
        values.fullName,
        values.email,
        values.phoneNumber,
        values.address
      )
        .then((res) => {
          setUpdated(!updated);
          Swal.fire({
            icon: "success",
            title: "Regeister success",
            text: `Wellcome ${res.data.fullName}`,
          });
          resetForm(initialValues)
        })
        .catch((e) => {
          setSubmitting(false);
          Swal.fire({
            icon: "error",
            title: "Oops...Register failed!",
            text: `Error: ${e.message}`,
          });
          console.log("error");
        });
    },

  });

  return (
    <div>
      <form className={classes.root} onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item xs={6}>
            <Input
              variant="outlined"
              label="Họ tên"
              className={`${getInputClasses("fullName")}`}
              {...formik.getFieldProps("fullName")}
              error={formik.touched.fullName && formik.errors.fullName}
              helperText={formik.errors.fullName}
            ></Input>
            <Input
              variant="outlined"
              label="Địa chỉ"
              className={`${getInputClasses("address")}`}
              {...formik.getFieldProps("address")}
              error={formik.touched.address && formik.errors.address}
              helperText={formik.errors.address}
            ></Input>
          </Grid>
          <Grid item xs={6}>
            <Input
              variant="outlined"
              label="Số điện thoại"
              className={`${getInputClasses("phoneNumber")}`}
              {...formik.getFieldProps("phoneNumber")}
              error={formik.touched.phoneNumber && formik.errors.phoneNumber}
              helperText={formik.errors.phoneNumber}
            ></Input>
            <Input
              variant="outlined"
              label="Địa chỉ Email"
              className={`${getInputClasses("email")}`}
              {...formik.getFieldProps("email")}
              error={formik.touched.email && formik.errors.email}
              helperText={formik.errors.email}
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
                onClick={formik.handleReset}
              ></CustomButton>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default CustomerForm;
