import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

import { FormProgressResponse } from "../../index";

interface UserFormProgressProps {
    formProgress: FormProgressResponse | null;
}

const FormProgressChart = ({ formProgress }: UserFormProgressProps) => {
  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        label: "Form Progress",
        data: [formProgress?.answeredQuestions, formProgress?.totalQuestions],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div className="my-4 w-full md:w-2/5 md:flex md:justify-between bg-background-3 shadow-lg rounded-lg p-5 text-white">
      <div className="w-full">
        <h3 className="text-lg font-semibold mb-3">{formProgress?.form_name}</h3>
        <Pie data={data} />
      </div>
    </div>
  );
};

export default FormProgressChart;
