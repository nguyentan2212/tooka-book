import React from "react";
import "./ExtraButton.css";

function ExtraButton({ ishover, clickHandler }) {
  return (
    <div className="d-flex h-100px" onClick={clickHandler}>
      <div
        className={`CustomButton w-75 ${ishover ? "active" : null}`}
      >
        <div className="extra_button">
          <i className="fas fa-wrench"></i>
        </div>
      </div>
    </div>
  );
}

export default ExtraButton;
