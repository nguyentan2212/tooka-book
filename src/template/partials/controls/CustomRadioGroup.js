import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";

export const CustomRadioGroup = (props) => {
  const { name, label, value, onChange, items } = props;
  return (
    <div>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <RadioGroup row={true} name={name} onChange={onChange} value={value}>
          {items.map((item, index) => (
            <FormControlLabel
              key={index}
              value={item.id}
              label={item.title}
              control={<Radio></Radio>}
            ></FormControlLabel>
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};
