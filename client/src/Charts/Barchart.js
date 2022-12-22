import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
function Barchart() {
  const [Barstate, setBarstate] = useState({
    series: [
      {
        name: "Acitve employees",
        data: [2.3, 3.1, 4.0, 6.1, 4.0, 3.6, 3.2, 2.3, 4.4, 7.8, 8.5, 9.2],
      },
    ],
    options: {
      chart: {
        //   hide the humberger icon
        toolbar: { show: false },
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 2,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: false,
        formatter: function (val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        position: "top",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: true,
          formatter: function (val) {
            return val + "%";
          },
        },
      },
      title: {
        text: "Monthly Employee Active Status, 2020",
        floating: true,
        offsetY: 330,
        align: "center",
        style: {
          color: "#444",
        },
      },
    },
  });
  return (
    <>
      <br />
      <br />
      <ReactApexChart
        options={Barstate.options}
        series={Barstate.series}
        type="bar"
        height={350}
      />
    </>
  );
}

export default Barchart;
