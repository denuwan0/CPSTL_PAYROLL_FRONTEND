import React from "react";
import Chart from "react-apexcharts";

export default function Chart3() {
  const chartData = {
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        type: "pie",
      },
      labels: ["EPF Corp", "Gross Salary", "Unrecovered", "Deductions", "ETF"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="pie"
        width="380"
        height={350}
      />
    </div>
  );
}
