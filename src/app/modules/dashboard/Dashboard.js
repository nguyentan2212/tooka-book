import React from "react";
import { OverviewWiget } from "./components/OverviewWidget";
import PatternWidget from "./components/PatternWidget";
import { TilesWidget } from "./components/TilesWidget";

function Dashboard() {
  return (
    <div className="my-12">
      <div className="row">
        <div className="col-lg-6 col-xxl-4">
          <OverviewWiget className="card-stretch gutter-b" />
        </div>
        <div className="col-lg-6 col-xxl-8">
          <div className="row">
            <div className="col-xxl-12">
              <TilesWidget className="card-stretch gutter-b" baseColor="info" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-xxl-6">
              <PatternWidget
                className="card-stretch gutter-b"
                imageUrl="/media/svg/patterns/taieri.svg"
                link="/banhang"
                title="Bán Sách"
                buttonTitle="Bán"
                backgroundColor="#663259"
              />
            </div>
            <div className="col-lg-12 col-xxl-6">
              <PatternWidget
                className="card-stretch gutter-b"
                imageUrl="/media/svg/patterns/rhone-2.svg"
                link="/baocao/doanhthu"
                title="Báo cáo doanh thu"
                buttonTitle="Xem"
                backgroundColor="#1B283F"></PatternWidget>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
