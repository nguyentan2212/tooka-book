/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, Switch, Redirect } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../template/helpers/AssetsHelpers";
import { ContentRoute } from "../../../../template/layout/components/content/ContentRoute";
import Login from "./Login";

export function AuthPage({ setUser }) {
  return (
    <>
      <div className="d-flex flex-column flex-root h-100">
        {/*begin::Login*/}
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white"
          id="kt_login">
          {/*begin::Aside*/}
          <div
            className="login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10"
            style={{
              backgroundImage: `url(${toAbsoluteUrl("/media/bg/bg-4.jpg")})`,
            }}>
            {/*begin: Aside Container*/}
            <div className="d-flex flex-row-fluid flex-column justify-content-between">
              {/* start:: Aside header */}
              <Link to="/" className="flex-column-auto mt-5 pb-lg-0 pb-10">
                <img
                  alt="Logo"
                  className="max-h-70px"
                  src={toAbsoluteUrl("/media/logos/logo-letter-1.png")}
                />
              </Link>
              {/* end:: Aside header */}

              {/* start:: Aside content */}
              <div className="flex-column-fluid d-flex flex-column justify-content-center">
                <h3 className="font-size-h1 mb-5 text-white">Welcome to TookABook!</h3>
                <p className="font-weight-lighter text-white opacity-80">
                  Hệ thống nhà sách uy tín, chất lượng.
                  <br />
                  Tất cả vì một gia sản sách to lớn, có sức sống dài lâu, có ý nghĩa với nhiều thế
                  hệ bạn đọc.
                </p>
              </div>
              {/* end:: Aside content */}

              {/* start:: Aside footer for desktop */}
              <div className="d-none flex-column-auto d-lg-flex justify-content-between mt-10">
                <div className="opacity-70 font-weight-bold	text-white">&copy; 2020 Metronic</div>
                <div className="d-flex">
                  <Link to="/terms" className="text-white">
                    Privacy
                  </Link>
                  <Link to="/terms" className="text-white ml-10">
                    Legal
                  </Link>
                  <Link to="/terms" className="text-white ml-10">
                    Contact
                  </Link>
                </div>
              </div>
              {/* end:: Aside footer for desktop */}
            </div>
            {/*end: Aside Container*/}
          </div>
          {/*begin::Aside*/}

          {/*begin::Content*/}
          <div className="d-flex flex-column flex-row-fluid position-relative p-7 overflow-hidden">
            {/*begin::Content header*/}
            <div className="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10"></div>
            {/*end::Content header*/}

            {/* begin::Content body */}
            <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
              <Switch>
                <ContentRoute
                  path="/auth/login"
                  component={() => <Login login={(user) => setUser(user)}></Login>}
                />
                <Redirect from="/auth" exact={true} to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch>
            </div>
            {/*end::Content body*/}

            {/* begin::Mobile footer */}
            <div className="d-flex d-lg-none flex-column-auto flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
              <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">
                &copy; 2020 Metronic
              </div>
              <div className="d-flex order-1 order-sm-2 my-2">
                <Link to="/terms" className="text-dark-75 text-hover-primary">
                  Privacy
                </Link>
                <Link to="/terms" className="text-dark-75 text-hover-primary ml-4">
                  Legal
                </Link>
                <Link to="/terms" className="text-dark-75 text-hover-primary ml-4">
                  Contact
                </Link>
              </div>
            </div>
            {/* end::Mobile footer */}
          </div>
          {/*end::Content*/}
        </div>
        {/*end::Login*/}
      </div>
    </>
  );
}
