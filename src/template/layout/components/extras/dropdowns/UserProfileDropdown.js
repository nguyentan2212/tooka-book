/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { toAbsoluteUrl } from "../../../../helpers";
import { DropdownTopbarItemToggler } from "../../../../partials/dropdowns/DropdownTopbarItemToggler";

export function UserProfileDropdown({ user }) {
  return (
    <Dropdown drop="down" alignRight>
      <Dropdown.Toggle as={DropdownTopbarItemToggler} id="dropdown-toggle-user-profile">
        <div className={"btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2"}>
          <span className="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1">
            Hi,
          </span>{" "}
          <span className="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3">
            {user.fullname}
          </span>
          <span className="symbol symbol-35 symbol-light-success">
            <span className="symbol-label font-size-h5 font-weight-bold">{user.fullname[0]}</span>
          </span>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu className="p-0 m-0 dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-lg">
        {/** ClassName should be 'dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl' */}

        <div className="d-flex align-items-center p-8 rounded-top">
          <div className="symbol symbol-md bg-light-primary mr-3 flex-shrink-0">
            <img src={toAbsoluteUrl("/media/users/300_21.jpg")} alt="" />
          </div>
          <div className="d-flex flex-column">
            <div className="text-dark font-weight-bold m-0 flex-grow-1 mr-3 font-size-h5">
              {user.fullname}
            </div>
            <div className="text-dark m-0 flex-grow-1 mr-3 font-size-h5">@{user.username}</div>
          </div>
        </div>
        <div className="separator separator-solid"></div>

        <div className="navi navi-spacer-x-0 pt-5">
          <div className="navi-footer d-flex justify-content-lg-center px-8 py-5">
            <Link to="/logout" className="btn btn-light-primary font-weight-bold">
              Đăng Xuất
            </Link>
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}
