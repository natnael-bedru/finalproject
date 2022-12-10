import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function Piechart() {
  const [Piestate, usePiestate] = useState({
    series: [76, 67, 61, 90],
    options: {
      chart: {
        height: 390,
        width: "500%  ",
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "30%",

            background: "transparent",
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
        },
      },
      colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
      labels: [
        "Total Employees",
        "Active Employees",
        "InActive Employees",
        "LinkedIn",
      ],
      legend: {
        show: true,
        floating: true,
        fontSize: "13px",
        position: "left",
        offsetX: -35,
        offsetY: 15,
        labels: {
          useSeriesColors: true,
        },
        markers: {
          size: 20,
        },
        formatter: function (seriesName, opts) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          vertical: 1,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false,
            },
          },
        },
      ],
    },
  });
  return (
    <>
      <ReactApexChart
        options={Piestate.options}
        series={Piestate.series}
        type="radialBar"
        height={390}
      />
    </>
  );
}

export default Piechart;
