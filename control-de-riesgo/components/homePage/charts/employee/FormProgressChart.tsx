import React, { use, useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { useUser } from "../../../../lib/userContext";
import { FormProgressResponse } from "../../../index";
import { color } from "chart.js/helpers";

const FormProgressChart = () => {
  const { user } = useUser();
  const [formProgress, setFormProgress] = useState<FormProgressResponse | null>(
    null
  );

  useEffect(() => {
    if (user) {
      const fetchFormProgress = async () => {
        try {
          const response = await fetch(
            `/api/dashboard/employee/getFormProgress?id=${user.usu_id}`
          );
          const data: FormProgressResponse = await response.json();
          setFormProgress(data);
        } catch (error) {
          console.error("Error fetching form progress data:", error);
        }
      };
      fetchFormProgress();
    }
  }, [user]);

  const data = {
    labels: ["Completo", "Restante"],
    datasets: [
      {
        label: "Progreso del formulario",
        data: [formProgress?.answeredQuestions, formProgress?.totalQuestions],
        color: ["#FFFFFF"],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div className="flex w-full p-5 text-center text-white bg-nodes items-center align-middle justify-center">
      <div className="w-1/2">
        <h3 className="text-lg font-semibold mb-3">
          {formProgress?.form_name}
        </h3>
        <Pie data={data} />
      </div>
    </div>
  );
};

export default FormProgressChart;
