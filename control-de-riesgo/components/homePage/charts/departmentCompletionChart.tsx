import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

interface Department {
  name: string;
  percentage: number;
}

interface DepartmentCompletionChartProps {
  departmentData: Department[];
}

const DepartmentCompletionChart = ({
  departmentData,
}: DepartmentCompletionChartProps) => {
  const data = {
    labels: departmentData.map((dept) => dept.name),
    datasets: [
      {
        label: "Percentage of Completed Responses",
        data: departmentData.map((dept) => dept.percentage),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgba(53, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return value + "%";
          },
          color: "white",
        },
        beginAtZero: true,
      },
      x: {
        ticks: {
          color: "white",
        },
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
  };

  return (
    <div className="my-4 w-full md:w-2/5 md:flex md:justify-between bg-background-3 shadow-lg rounded-lg p-5">
      <div style={{ width: "100%", height: "200px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default DepartmentCompletionChart;
