import React from "react";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";

export const DatePicker = (props) => {
  const {
    name,
    value,
    label,
    onChange = () => {},
    views = ["year", "month", "date"],
  } = props;

  const convertToDefaultEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        views={views}
        inputVariant="outlined"
        label={label}
        format="MMM/yyyy"
        name={name}
        value={value}
        onChange={(date) => {
          onChange(convertToDefaultEventPara(name, date));
        }}
      ></KeyboardDatePicker>
    </MuiPickersUtilsProvider>
  );
};
