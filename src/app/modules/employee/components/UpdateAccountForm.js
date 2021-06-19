import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { Grid, makeStyles } from "@material-ui/core";
import { postAccount } from "../js/employee";
import { Input, CustomButton } from "../../../../template/partials/controls";
import { updateAccount } from "../js/employee";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

function UpdateAccountForm(props) {
  const { account, updated, setUpdated } = props;

  const initialValues = {
    username: account.username,
    realname: account.realname,
    email: account.email,
    phonenumber: account.phonenumber,
    address: account.address,
    password: "",
    repassword: "",
  };

  const classes = useStyles();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const UpdateSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Ít nhất 3 ký tự")
      .max(50, "Tối đa 50 ký tự")
      .required("Không được để trông"),
    realname: Yup.string()
      .min(3, "Ít nhất 3 ký tự")
      .max(50, "Tối đa 50 ký tự")
      .required("Không được để trông"),
    email: Yup.string()
      .email("Sai định dạng")
      .min(3, "Ít nhất 3 ký tự")
      .max(50, "Tối đa 50 ký tự")
      .required("Không được để trông"),
    address: Yup.string()
      .min(3, "Ít nhất 3 ký tự")
      .max(50, "Tối đa 50 ký tự")
      .required("Không được để trông"),
    phonenumber: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .min(9, "Ít nhất 9 ký tự")
      .max(15, "Tối đa 15 ký tự")
      .required("Không được để trông"),
    password: Yup.string()
      .min(3, "Ít nhất 3 ký tự")
      .max(50, "Tối đa 50 ký tự")
      .required("Không được để trông"),
    repassword: Yup.string()
      .required("Không được để trông")
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Nhập lại password không khớp"
        ),
      }),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: UpdateSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      updateAccount(values)
        .then(() => {
          setUpdated(!updated);
          Swal.fire({
            icon: "success",
            title: "Updated success",
            text: "Thêm thành công",
          });
          resetForm(initialValues);
        })
        .catch((e) => {
          setSubmitting(false);
          Swal.fire({
            icon: "error",
            title: "Oops...Updated failed!",
            text: `Error: ${e.message}`,
          });
          console.log("error");
        });
    },
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

  return (
    <div style={{ width: 600 }}>
      <form className={classes.root} onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item xs={6}>
            <Input
              variant="outlined"
              label="Username"
              disabled
              className={`${getInputClasses("username")}`}
              {...formik.getFieldProps("username")}
              error={formik.touched.username && formik.errors.username}
              helperText={formik.errors.username}
            ></Input>
            <Input
              variant="outlined"
              label="Email"
              className={`${getInputClasses("email")}`}
              {...formik.getFieldProps("email")}
              error={formik.touched.email && formik.errors.email}
              helperText={formik.errors.email}
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
              label="Họ tên"
              className={`${getInputClasses("realname")}`}
              {...formik.getFieldProps("realname")}
              error={formik.touched.realname && formik.errors.realname}
              helperText={formik.errors.realname}
            ></Input>
            <Input
              variant="outlined"
              label="Số điện thoại"
              className={`${getInputClasses("phonenumber")}`}
              {...formik.getFieldProps("phonenumber")}
              error={formik.touched.phonenumber && formik.errors.phonenumber}
              helperText={formik.errors.phonenumber}
            ></Input>
            <Input
              variant="outlined"
              label="Mật khẩu"
              type="password"
              className={`${getInputClasses("password")}`}
              {...formik.getFieldProps("password")}
              error={formik.touched.password && formik.errors.password}
              helperText={formik.errors.password}
            ></Input>
            <Input
              variant="outlined"
              label="Nhập lại mật khẩu"
              type="password"
              className={`${getInputClasses("repassword")}`}
              {...formik.getFieldProps("repassword")}
              error={formik.touched.repassword && formik.errors.repassword}
              helperText={formik.errors.repassword}
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

export default UpdateAccountForm;
