import React, { useState, useEffect } from "react";
import BookItem from "../components/BookItem";
import {
  InputAdornment,
  makeStyles,
  Table,
  Toolbar,
  Paper,
  Grid,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { Input } from "../../../../template/partials/controls";
import { getAllBooks } from "../js/book";

function BookManagerPage(props) {
  const { className } = props;
  const [filterFunc, setFilterFunc] = useState({
    func: (items) => {
      return items;
    },
  });

  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    const fetchAllBooks = async () => {
      const { data } = await getAllBooks();
      setBookList(data);
    };
    fetchAllBooks();
  }, []);

  const handleSearch = (event) => {
    let target = event.target;

    setFilterFunc({
      func: (items) => {
        if (target.value === "") return items;
        else
          return items.filter(
            (item) =>
              item.title.toLowerCase().includes(target.value) &&
              item.author.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const useStyles = makeStyles((theme) => ({
    table: {
      marginTop: theme.spacing(0),
      "& thead th": {
        fontWeight: "600",
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
      },
      "& tbody td": {
        fontWeight: "300",
      },
      "& tbody tr:hover": {
        backgroundColor: "#fffbf2",
        cursor: "pointer",
      },
    },
    searchInput: {
      width: "75%",
    },
    pageContent: {
      margin: theme.spacing(0),
      padding: theme.spacing(0),
    },
    newButton: {
      position: "absolute",
      right: "10px",
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Input
            onChange={(event) => handleSearch}
            label="Search Categories"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search></Search>
                </InputAdornment>
              ),
            }}
          ></Input>
        </Toolbar>

        <Table className={classes.table}></Table>
        <Grid container item spacing={4}>
          {bookList.map((book) => (
            <Grid item>
              <BookItem
                title={book.name}
                src={book.img}
                author={book.author}
                des={book.des}
                price={book.price}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
}

export default BookManagerPage;
