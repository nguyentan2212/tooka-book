import React, { useState, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { Input, CustomButton } from "../../../../template/partials/controls";
import { postBook } from "../js/book";
import { getAllAuthor } from "../../authors/js/author";
import { getAllCategories } from "../../categories/js/category";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

const initialValues = {
  title: "",
  categoryId: 0,
  publisher: "",
  publishYear: 2021,
  authorId: 0,
  imageUrl: "",
};

function AddBookForm(props) {
  const { updated, setUpdated } = props;

  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    const fecthData = async () => {
      setCategories(await getAllCategories());
      setAuthors(await getAllAuthor());
    };
    fecthData();
  }, []);

  let year = new Date().getFullYear();
  const AddBookSchema = Yup.object().shape({
    title: Yup.string().required("Không được để trống"),
    categoryId: Yup.number().moreThan(0, "Không được để trống"),
    publisher: Yup.string().required("Không được để trống"),
    publishYear: Yup.number()
      .required("Không được để trống")
      .integer("Định dạng không đúng")
      .max(year, `Năm xuất bản không lớn hơn ${year}}`)
      .min(2000, "Năm xuất bản phải từ 2000 trở đi"),
    authorId: Yup.number().moreThan(0, "Không được để trống"),
    imageUrl: Yup.string()
      .required("Không được để trống")
      .url("Định dạng không phù hợp"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: AddBookSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log(values);
      postBook(
        values.title,
        values.categoryId,
        values.publisher,
        values.publishYear,
        values.authorId,
        values.imageUrl
      )
        .then(() => {
          setUpdated(!updated);
          Swal.fire({
            icon: "success",
            title: "Regeister success",
            text: "Thêm thành công",
          });
          resetForm(initialValues);
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
              label="Tựa sách"
              className={`${getInputClasses("title")}`}
              {...formik.getFieldProps("title")}
              error={formik.touched.title && formik.errors.title}
              helperText={formik.errors.title}
            ></Input>
            <Autocomplete
              id="combo-box-demo"
              options={authors}
              getOptionLabel={(option) => option.name}
              onChange={(e, option) =>
                formik.setFieldValue("authorId", option?.id || 0)
              }
              renderInput={(params) => (
                <Input
                  {...params}
                  label="Tác giả"
                  variant="outlined"
                  error={formik.touched.authorId && formik.errors.authorId}
                  helperText={formik.errors.authorId}
                />
              )}
            />
            <Input
              variant="outlined"
              label="Năm xuất bản"
              className={`${getInputClasses("publishYear")}`}
              {...formik.getFieldProps("publishYear")}
              error={formik.touched.publishYear && formik.errors.publishYear}
              helperText={formik.errors.publishYear}
            ></Input>
          </Grid>
          <Grid item xs={6}>
            <Input
              variant="outlined"
              label="Nhà xuất bản"
              className={`${getInputClasses("publisher")}`}
              {...formik.getFieldProps("publisher")}
              error={formik.touched.publisher && formik.errors.publisher}
              helperText={formik.errors.publisher}
            ></Input>
            <Autocomplete
              options={categories}
              getOptionLabel={(option) => option.name}
              onChange={(e, option) =>
                formik.setFieldValue("categoryId", option?.id || 0)
              }
              renderInput={(params) => (
                <Input
                  {...params}
                  label="Thể loại"
                  variant="outlined"
                  error={formik.touched.categoryId && formik.errors.categoryId}
                  helperText={formik.errors.categoryId}
                />
              )}
            />
            <Input
              variant="outlined"
              label="URL ảnh"
              className={`${getInputClasses("imageUrl")}`}
              {...formik.getFieldProps("imageUrl")}
              error={formik.touched.imageUrl && formik.errors.imageUrl}
              helperText={formik.errors.imageUrl}
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

export default AddBookForm;
