import React from "react";
import ReactExport from "react-export-excel";
import { CustomButton } from "../controls";
import { GetApp } from "@material-ui/icons";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export function Download(props) {
  const { name, reportData } = props;
  const { columns, data } = reportData;
  return (
    <ExcelFile
      filename={`${name}-${+new Date()}`}
      className="col-lg-2"
      element={
        <CustomButton
          text="Xuất File"
          variant="outlined"
          startIcon={<GetApp></GetApp>}
          className="btn btn-success font-weight-bolder font-size-sm"
        ></CustomButton>
      }
    >
      <ExcelSheet data={data} name={name}>
        {columns &&
          columns.map((column, index) => (
            <ExcelColumn key={index} label={column.label} value={column.id} />
          ))}
      </ExcelSheet>
      
    </ExcelFile>
  );
}
