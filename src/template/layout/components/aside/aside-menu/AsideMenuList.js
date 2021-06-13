/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../helpers";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${
          !hasSubmenu && "menu-item-active"
        } menu-item-open menu-item-not-hightlighted`
      : "";
  };

  return (
    <>
      {/*begin::menu nav*/}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level Dashboard Menu*/}
        <li
          className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Tổng Quan</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level BÁN HÀNG*/}
        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive("/banhang",true)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link menu-toggle" to="/banhang">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Cap-2.svg")} />
            </span>
            <span className="menu-text">Bán Hàng</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level QUAN LÝ HÓA ĐƠN*/}
        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive("/quanlyhoadon",true)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link menu-toggle" to="/quanlyhoadon">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Cap-2.svg")} />
            </span>
            <span className="menu-text">Quản Lý Hóa Đơn </span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level QUẢN LÝ KHO*/}
        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive("/quanlykho",true)}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/quanlykho">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Cap-2.svg")} />
            </span>
            <span className="menu-text">Quản Lý Kho</span>
            <i className="menu-arrow" />
          </NavLink>

          {/*begin::2 Level */}
          <div className="menu-submenu">
            <i className="menu-arrow"/>
            <ul className="menu-subnav">
              <li className="menu-item menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Quản Lý Kho</span>
                </span>
              </li>
              <li className={`menu-item ${getMenuItemActive("/quanlykho/sach",true)}`} aria-haspopup="true">
                <NavLink className="menu-link" to="/quanlykho/sach">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Quản Lý Sách</span>
                </NavLink>
              </li>
              <li className={`menu-item ${getMenuItemActive("/quanlykho/theloai",true)}`} aria-haspopup="true">
                <NavLink className="menu-link" to="/quanlykho/theloai">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Quản Lý Thể Loại</span>
                </NavLink>
              </li>
              <li className={`menu-item ${getMenuItemActive("/quanlykho/tacgia",true)}`} aria-haspopup="true">
                <NavLink className="menu-link" to="/quanlykho/tacgia">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Quản Lý Tác Giả</span>
                </NavLink>
              </li>
            </ul>
          </div>
          {/*end::2 Level */}
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level QUẢN NHÂN VIÊN*/}
        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive("/quanlynhanvien",true)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link menu-toggle" to="/quanlynhanvien">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Cap-2.svg")} />
            </span>
            <span className="menu-text">Quản Lý Nhân Viên</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level QUẢN LÝ KHÁCH HÀNG*/}
        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive("/khach",true)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link menu-toggle" to="/khach">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Cap-2.svg")} />
            </span>
            <span className="menu-text">Quản Lý Khách Hàng</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level BÁO CÁO*/}
        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive("/baocao",true)}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/baocao">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Cap-2.svg")} />
            </span>
            <span className="menu-text">Báo Cáo</span>
            <i className="menu-arrow" />
          </NavLink>

          {/*begin::2 Level*/}
          <div className="menu-submenu">
            <i className="menu-arrow"/>
            <ul className="menu-subnav">
              <li className="menu-item menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Báo Cáo</span>
                </span>
              </li>
              <li className={`menu-item ${getMenuItemActive("/baocao/tonkho",true)}`} aria-haspopup="true">
                <NavLink className="menu-link" to="/baocao/tonkho">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Báo Cáo Tồn Kho</span>
                </NavLink>
              </li>
              <li className={`menu-item ${getMenuItemActive("/baocao/doanhthu",true)}`} aria-haspopup="true">
                <NavLink className="menu-link" to="/baocao/doanhthu">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Báo Cáo Doanh Thu</span>
                </NavLink>
              </li>
            </ul>
          </div>
          {/*end::2 Level*/}

        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level CÀI ĐẶT*/}
        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive("/rules",true)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link menu-toggle" to="/rules">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Cap-2.svg")} />
            </span>
            <span className="menu-text">Cài Đặt</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

      </ul>

      {/*end::menu nav*/}
    </>
  );
}
