import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  dialogTitle: {
    paddingRight: "0px",
  },
}));

export const PopUp = (props) => {
  const { title, children, openPopUp, setOpenPopUp } = props;
  const classes = useStyles();
  return (
    <>
      <Dialog
        open={openPopUp}
        maxWidth="md"
        classes={{ paper: classes.dialogWrapper }}
      >
        <DialogTitle className={classes.dialogTitle}>
          <div style={{ display: "flex" }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              {title}
            </Typography>
            <a
              href="#"
              className="btn btn-light-danger font-weight-bolder font-size-sm mx-1"
              onClick={() => setOpenPopUp(false)}
            >
              <CloseIcon></CloseIcon>
            </a>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <div>{children}</div>
        </DialogContent>
      </Dialog>
    </>
  );
};