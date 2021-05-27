import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React from "react";

export const DropdownList = (props) => {
  const { name, label, value, error = null, onChange, options } = props;
  return (
    <FormControl variant="outlined" {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      <Select name={name} value={value} onChange={onChange} label={label}>
        <MenuItem value="">None</MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option.id}>
            {option.title}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText> {error} </FormHelperText>}
    </FormControl>
  );
};