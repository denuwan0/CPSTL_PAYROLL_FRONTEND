import React from "react";
import Chart from "react-apexcharts";

export default function Chart2() {
  const chartData = {
    series: [
      {
        name: "Rs.",
        data: [30000, 40000, 35000, 50000, 49000, 60000, 70000, 91000, 125000],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        title: {
          text: "Function",
        },
        categories: [
          "Function1",
          "Function2",
          "Function3",
          "Function4",
          "Function5",
          "Function6",
          "Function7",
          "Function8",
          "Function9",
        ],
      },
      yaxis: {
        title: {
          text: "Rs.",
        },
      },
      fill: {
        colors: ["#007bff"],
      },
    },
  };

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
}
