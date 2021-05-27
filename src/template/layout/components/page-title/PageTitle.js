import { Card, makeStyles, Paper } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  pageIcon: {
    color: "#3c44b1",
  }
}));

const PageTitle = (props) => {
    const { title, subTitle, icon, className } = props;
  
    const classes = useStyles();
    return (
      <Paper elevation={0} className={` ${className}`}>
        <div className="d-flex align-items-center p-4 mb-2">
          <Card className={`d-block p-2 ${classes.pageIcon}`}>{React.createElement(icon)}</Card>
          <div className="d-flex flex-column ml-4">
            <span className="text-dark-75 font-weight-bolder font-size-lg">{title}</span>
            <span className="text-muted font-size-lg">{subTitle}</span>
          </div>
        </div>
      </Paper>
    );
  };
  
  export default PageTitle;
  

