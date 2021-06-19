import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../template/helpers/AssetsHelpers";
import { Link } from "react-router-dom";

function PatternWidget(props) {
  const { className, imageUrl, link, title, buttonTitle, backgroundColor} = props;
  const backgroundImageUrl = toAbsoluteUrl(imageUrl);
  return (
    <div
      className={`card card-custom ${className} bgi-no-repeat bgi-no-repeat bgi-size-cover`}
      style={{
        backgroundImage: `url("${backgroundImageUrl}")`,
        backgroundColor: backgroundColor,
        backgroundSize: "100%",
      }}>
      <div className="card-body d-flex align-items-center">
        <div>
          <h3 className="text-white font-weight-bolder line-height-lg mb-5">{title}</h3>
          <Link to={link} className="btn btn-success font-weight-bold px-6 py-3">
            {buttonTitle}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PatternWidget;
