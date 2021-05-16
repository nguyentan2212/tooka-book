/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { checkIsActive } from "../../../../helpers";

export function HeaderMenu({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url) => {
    return checkIsActive(location, url) ? "menu-item-active" : "";
  };

  return (
    <div
      id="kt_header_menu"
      className={`header-menu header-menu-mobile ${layoutProps.ktMenuClasses}`}
      {...layoutProps.headerMenuAttributes}
    >
      {/*begin::Header Nav*/}
      <div className="d-flex align-items-center">
        <NavLink to="/dashboard">
          <h3 className="text-dark font-weight-bolder text-uppercase">Cửa hàng sách tooka book</h3>
        </NavLink>
      </div>
      {/*end::Header Nav*/}
    </div>
  );
}
