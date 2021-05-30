import React from "react";
import { Grid } from "@material-ui/core";
import "./ExtraButton.css";

function ExtraButton({ ishover }) {
  const DeleteClick = () => {
    console.log("Hello");
  };
  return (
    <div>
      <Grid
        style={{ height: "95px" }}
        xs
        container
        direction="row"
        justify="flex-end"
        alignItems="flex-end"
      >
        <Grid
          style={{ height: "50px", marginLeft: "15px" }}
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-end"
        >
          <Grid item container>
            <ul className={ishover ? "SearchBar active" : "SearchBar"}>
              <div className="extra_button">
                <i class="fas fa-trash"></i>
              </div>
            </ul>
          </Grid>
          <Grid item container>
            <ul className={ishover ? "SearchBar2 active" : "SearchBar2"}>
              <div onClick={DeleteClick} className="extra_button">
                <i class="fas fa-wrench"></i>
              </div>
            </ul>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ExtraButton;
