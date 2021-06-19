/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo, useState, useEffect } from "react";
import objectPath from "object-path";
import ApexCharts from "apexcharts";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../template/helpers/AssetsHelpers";
import { useHtmlClassService } from "../../../../template/layout/core/MetronicLayout";

export function RevenueChartWidget({ className, symbolShape, baseColor }) {
  const uiService = useHtmlClassService();
  const [categories, setCategories] = useState(null);
  const [data, setData] = useState(null);

  const layoutProps = useMemo(() => {
    return {
      colorsGrayGray500: objectPath.get(uiService.config, "js.colors.gray.gray500"),
      colorsGrayGray200: objectPath.get(uiService.config, "js.colors.gray.gray200"),
      colorsGrayGray300: objectPath.get(uiService.config, "js.colors.gray.gray300"),
      colorsThemeBaseSuccess: objectPath.get(uiService.config, `js.colors.theme.base.${baseColor}`),
      colorsThemeLightSuccess: objectPath.get(
        uiService.config,
        `js.colors.theme.light.${baseColor}`
      ),
      fontFamily: objectPath.get(uiService.config, "js.fontFamily"),
    };
  }, [uiService, baseColor]);

  useEffect(() => {
    const element = document.getElementById("revenue_widget_chart");

    if (!element) {
      return;
    }

    const options = getChartOptions(layoutProps, categories, data);

    const chart = new ApexCharts(element, options);
    chart.render();
    return function cleanUp() {
      chart.destroy();
    };
  }, [layoutProps]);

  console.log(layoutProps);
  return (
    <>
      {/* begin::Stats Widget 10 */}
      <div className={`card card-custom ${className}`}>
        {/* begin::Body */}
        <div className="card-body p-0">
          <div className="d-flex align-items-center justify-content-between card-spacer flex-grow-1">
            <span className={`symbol ${symbolShape} symbol-50 symbol-light${baseColor} mr-2`}>
              <span className="symbol-label">
                <span className={`svg-icon svg-icon-xl svg-icon-${baseColor}`}>
                  <SVG src={toAbsoluteUrl("/media/svg/patterns/taieri.svg")}></SVG>
                </span>
              </span>
            </span>
            <div className="d-flex flex-column text-right">
              <span className="text-dark-75 font-weight-bolder font-size-h3">+4200000 vnđ</span>
              <span className="text-muted font-weight-bold mt-2">Doanh thu</span>
            </div>
          </div>
          <div
            id="revenue_widget_chart"
            className="card-rounded-bottom"
            data-color={baseColor}
            style={{ height: "150px" }}
          />
        </div>
        {/* end::Body */}
      </div>
      {/* end::Stats Widget 10 */}
    </>
  );
}

function getChartOptions(layoutProps, categories, data) {
  var options = {
    series: [
      {
        name: "Net Profit",
        data: data ? data : [],
      },
    ],
    chart: {
      type: "area",
      height: 150,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "solid",
      opacity: 1,
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 3,
      colors: [layoutProps.colorsThemeBasePrimary],
    },
    xaxis: {
      categories: categories ? categories : [],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        style: {
          colors: layoutProps.colorsGrayGray500,
          fontSize: "12px",
          fontFamily: layoutProps.fontFamily,
        },
      },
      crosshairs: {
        show: false,
        position: "front",
        stroke: {
          color: layoutProps.colorsGrayGray300,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: "12px",
          fontFamily: layoutProps.fontFamily,
        },
      },
    },
    yaxis: {
      min: 0,
      max: 55,
      labels: {
        show: false,
        style: {
          colors: layoutProps.colorsGrayGray500,
          fontSize: "12px",
          fontFamily: layoutProps.fontFamily,
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      hover: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: layoutProps.fontFamily,
      },
      y: {
        formatter: function (val) {
          return "$" + val + " thousands";
        },
      },
    },
    colors: [layoutProps.colorsThemeLightSuccess],
    markers: {
      colors: [layoutProps.colorsThemeLightSuccess],
      strokeColor: [layoutProps.colorsThemeBaseSuccess],
      strokeWidth: 3,
    },
  };
  return options;
}
