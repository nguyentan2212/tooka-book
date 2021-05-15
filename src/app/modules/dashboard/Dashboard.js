import React from "react";
import { OverviewWiget } from "./components/OverviewWidget";
import { RevenueChartWidget } from "./components/RevenueChartWidget";
import { OrderChartWidget } from "./components/OrderChartWidget";

function Dashboard() {
  return (
    <div>
      <div className="row">
        <div className="col-lg-6 col-xxl-6">
          <OverviewWiget className="card-stretch gutter-b" />
        </div>
        <div className="col-lg-6 col-xxl-6">
          <div className="row">
            <div className="col-lg-6 col-xxl-12">
              <RevenueChartWidget className="card-stretch gutter-b" />
            </div>
            <div className="col-lg-6 col-xxl-12">
              <OrderChartWidget className="card-stretch gutter-b" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
