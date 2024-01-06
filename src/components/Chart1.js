import React from "react";
import Chart from "react-apexcharts";

export default function Chart1() {
  const chartData = {
    series: [
      {
        name: "Hours",
        data: [300, 400, 350, 500, 490, 600, 700, 910, 1250],
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
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
          text: "Hours",
        },
      },
    },
  };

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
}
