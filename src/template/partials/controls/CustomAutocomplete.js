import React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

export function CustomAutocomplete(props) {
  const { data, className, label = "Combo box", renderOption } = props;

  return (
    <Autocomplete
      className={`${className}`}
      options={data}
      autoHighlight
      getOptionLabel={(option) => option.title}
      renderOption={(option) => React.createElement(renderOption,option)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          InputProps={{ ...params.InputProps, type: "search" }}
        />
      )}
    />
  );
}
