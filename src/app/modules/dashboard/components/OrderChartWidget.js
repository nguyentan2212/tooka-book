/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo, useEffect } from "react";
import objectPath from "object-path";
import ApexCharts from "apexcharts";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../template/helpers/AssetsHelpers";
import { useHtmlClassService } from "../../../../template/layout/core/MetronicLayout";

export function OrderChartWidget({ className, symbolShape, baseColor }) {
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      colorsGrayGray500: objectPath.get(
        uiService.config,
        "js.colors.gray.gray500"
      ),
      colorsGrayGray200: objectPath.get(
        uiService.config,
        "js.colors.gray.gray200"
      ),
      colorsGrayGray300: objectPath.get(
        uiService.config,
        "js.colors.gray.gray300"
      ),
      colorsThemeBaseSuccess: objectPath.get(
        uiService.config,
        `js.colors.theme.base.${baseColor}`
      ),
      colorsThemeLightSuccess: objectPath.get(
        uiService.config,
        `js.colors.theme.light.${baseColor}`
      ),
      fontFamily: objectPath.get(uiService.config, "js.fontFamily"),
    };
  }, [uiService, baseColor]);

  useEffect(() => {
    const element = document.getElementById("orders_widget_chart");

    if (!element) {
        return;
      }
  
      const options = getChartOptions(layoutProps);
  
      const chart = new ApexCharts(element, options);
      chart.render();
      return function cleanUp() {
        chart.destroy();
      };
  }, [layoutProps]);

  return (
    <>
      {/* begin::Stats Widget 10 */}
      <div className={`card card-custom ${className}`}>
        {/* begin::Body */}
        <div className="card-body p-0">
          <div className="d-flex align-items-center justify-content-between card-spacer flex-grow-1">
            <span
              className={`symbol ${symbolShape} symbol-50 symbol-light${baseColor} mr-2`}
            >
              <span className="symbol-label">
                <span className={`svg-icon svg-icon-xl svg-icon-${baseColor}`}>
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Shopping/Cart3.svg")}
                  ></SVG>
                </span>
              </span>
            </span>
            <div className="d-flex flex-column text-right">
              <span className="text-dark-75 font-weight-bolder font-size-h3">
                +30
              </span>
              <span className="text-muted font-weight-bold mt-2">Orders Change</span>
            </div>
          </div>
          <div
            id="orders_widget_chart"
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

function getChartOptions(layoutProps) {
    const strokeColor = "#E1F0FF";
  
    const options = {
      series: [
        {
          name: "Net Profit",
          data: [23, 32, 22, 47, 54, 30, 40],
        },
      ],
      chart: {
        type: "area",
        height: 200,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        sparkline: {
          enabled: true,
        },
        dropShadow: {
          enabled: true,
          enabledOnSeries: undefined,
          top: 5,
          left: 0,
          blur: 3,
          color: strokeColor,
          opacity: 0.5,
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
        opacity: 0,
      },
      stroke: {
        curve: "smooth",
        show: true,
        width: 3,
        colors: [strokeColor],
      },
      xaxis: {
        categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
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
      },
      yaxis: {
        min: 0,
        max: 80,
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
        marker: {
          show: false,
        },
      },
      colors: ["transparent"],
      markers: {
        colors: layoutProps.colorsThemeBaseDanger,
        strokeColor: [strokeColor],
        strokeWidth: 3,
      },
    };
    return options;
  }
  