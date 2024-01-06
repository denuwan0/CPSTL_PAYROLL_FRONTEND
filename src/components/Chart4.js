import React from "react";
import Chart from "react-apexcharts";

export default function Chart4() {
  const chartData = {
    series: [
      {
        name: "2022",
        data: [300, 400, 250, 500, 490, 210, 700, 910, 1250],
      },
      {
        name: "2023",
        data: [230, 120, 540, 610, 320, 560, 810, 890, 630],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
      },
      dataLabels: {
        enabled: false,
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
        ],
      },
      yaxis: {
        title: {
          text: "Hours",
        },
      },
      colors: ["#007bff", "#28a745"], // Colors for the two series
      stroke: {
        curve: "smooth",
      },
    },
  };

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={200}
      />
    </div>
  );
}
