import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function Colchart() {
  const [colchart, setColcart] = useState({
    series: [
      {
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
      },
    ],
    options: {
      chart: {
        toolbar: { show: false },
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "South Korea",
          "Canada",
          "United Kingdom",
          "Netherlands",
          "Italy",
          "France",
          "Japan",
          "United States",
          "China",
          "Germany",
        ],
      },
    },
  });
  return (
    <>
      <br />
      <br />
      <ReactApexChart
        options={colchart.options}
        series={colchart.series}
        type="bar"
        height={350}
      />
    </>
  );
}

export default Colchart;
