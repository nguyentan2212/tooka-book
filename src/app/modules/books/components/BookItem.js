import React, { useState } from "react";
import {
  makeStyles,
  Paper,
  Grid,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import ExtraButton from "./ExtraButton";
import {toAbsoluteUrl} from '../../../../template/helpers/AssetsHelpers';

function BookItem(props) {
  const { src, des, title, author, price } = props;
  const [ishover, setIshover] = useState(false);

  const handleishover = () => setIshover(!ishover);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      margin: "auto",
      maxWidth: 250,
      maxHeight: 420,
      minWidth: 250,
      minHeight: 420,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    img: {
      margin: "auto",
      display: "block",
      minWidth: "70%",
      minHeight: "100%",
      maxHeight: "230px",
    },
    item: {
      justifyContent: "center",
      display: "flex",
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper onClick={handleishover} className={classes.paper}>
        <Grid container spacing={2} classname={classes.item}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item container xs>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="flex-start"
                >
                  <Typography
                    style={{ fontSize: "20px", textAlign: "center" }}
                    variant="body2"
                    gutterBottom
                  >
                    {title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="textSecondary">
                    {author}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} item>
              <ButtonBase style={{ width: "100%" }} className={classes.image}>
                <img className={classes.img} alt="complex" src={toAbsoluteUrl(src)} />
                <ExtraButton ishover={ishover} />
              </ButtonBase>
            </Grid>
            <Grid container xs>
              <Grid xs={12} container>
                <Typography variant="body2" color="textSecondary">
                  {des}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Typography style={{ color: "green" }} variant="subtitle1">
                ${price}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default BookItem;
