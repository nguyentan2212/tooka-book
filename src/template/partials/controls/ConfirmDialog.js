import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";

import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";

import React from "react";

import {CustomButton} from "./CustomButton";

const useStyles = makeStyles((theme) => ({
  dialog: {
    position: "absolute",
    top: theme.spacing(10),
    padding: theme.spacing(2),
  },
  dialogContent: {
    textAlign: "center",
  },
  dialogTitle: {
    textAlign: "center",
  },
  dialogActions: {
    justifyContent: "center",
  },
  dialogIcon: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      cursor: "default",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "5rem",
    },
  },
}));

export const ConfirmDialog = (props) => {
  const { confirmDialog, setConfirmDialog } = props;

  const classes = useStyles();
  return (
    <div>
      <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
        <DialogTitle className={classes.dialogTitle}>
          <IconButton className={classes.dialogIcon} disableRipple>
            <NotListedLocationIcon></NotListedLocationIcon>
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography variant="h6">{confirmDialog.title}</Typography>
          <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <CustomButton
            text="Yes"
            color="secondary"
            onClick={confirmDialog.onConfirm}
          ></CustomButton>
          <CustomButton
            text="No"
            color="default"
            onClick={() =>
              setConfirmDialog({ ...confirmDialog, isOpen: false })
            }
          ></CustomButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};
