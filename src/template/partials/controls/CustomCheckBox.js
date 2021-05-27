import { Checkbox, FormControl, FormControlLabel } from "@material-ui/core";
import React from "react";

export const CustomCheckBox = (props) => {
  const { name, value, label, onChange } = props;
  const convertToDefaultEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });
  return (
    <FormControl>
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            color="primary"
            checked={value}
            onChange={(event) => {
              onChange(convertToDefaultEventPara(name, event.target.checked));
            }}
          ></Checkbox>
        }
        label={label}
      ></FormControlLabel>
    </FormControl>
  );
};
