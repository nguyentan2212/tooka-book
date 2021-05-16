import React from "react";
import { OverviewWiget } from "./components/OverviewWidget";
import { RevenueChartWidget } from "./components/RevenueChartWidget";
import { OrderChartWidget } from "./components/OrderChartWidget";
import {TilesWidget} from "./components/TilesWidget";

function Dashboard() {
  return (
    <div>
      <div className="row">
        <div className="col-lg-6 col-xxl-4">
          <OverviewWiget className="card-stretch gutter-b" />
        </div>
        <div className="col-lg-6 col-xxl-8">
          <div className="row">
            <div className="col-xxl-12">
              <TilesWidget
                className="card-stretch gutter-b"
                baseColor="info"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-xxl-6">
              <OrderChartWidget
                className="card-stretch gutter-b"
                baseColor="info"
              />
            </div>
            <div className="col-lg-12 col-xxl-6">
              <RevenueChartWidget
                className="card-stretch gutter-b"
                baseColor="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
