import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./style.css";
import "./custom.css";
import App from "./app/App";
import { MetronicLayoutProvider } from "./template/layout/core/MetronicLayout";
import { MetronicSubheaderProvider } from "./template/layout/core/MetronicSubheader";
import { MetronicSplashScreenProvider } from "./template/layout/core/MetronicSplashScreen";
import { setupAxios } from "./app/js";

import "./template/assets/plugins/keenthemes-icons/font/ki.css";
import "socicon/css/socicon.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./template/assets/plugins/flaticon/flaticon.css";
import "./template/assets/plugins/flaticon2/flaticon.css";
// Datepicker
import "react-datepicker/dist/react-datepicker.css";

//setup  axios requests
const instance = setupAxios();

ReactDOM.render(
  <MetronicLayoutProvider>
    <MetronicSubheaderProvider>
      <MetronicSplashScreenProvider>
        <App></App>
      </MetronicSplashScreenProvider>
    </MetronicSubheaderProvider>
  </MetronicLayoutProvider>,
  document.getElementById("root")
);
