import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { useUser } from '../../../../lib/userContext';

interface Project {
  form_name: string;
  department: string;
  form_date_start: string;
  form_date_finish: string;
  progress: number;
}

const ProjectProgressChart: React.FC = () => {
  const { user } = useUser();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (user) {
      const fetchProjectProgress = async () => {
        try {
          const response = await fetch('/api/dashboard/coordinator/getProjectProgress');
          const data = await response.json();
          setProjects(data);
        } catch (error) {
          console.error('Error fetching project progress:', error);
        }
      };
      fetchProjectProgress();
    }
  }, [user]);

  const data = {
    labels: projects.map((project) => project.department),
    datasets: [
      {
        label: 'Project Progress (%)',
        data: projects.map((project) => project.progress),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (tickValue: number | string) => `${tickValue}%`,
          color: 'white',
        },
      },
      x: {
        ticks: {
          color: 'white',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
  };

  return (
    <div className="w-full bg-background-3 shadow-lg rounded-lg p-5 text-white bg-nodes text-center">
      <h3 className="text-lg font-semibold mb-3">Project Progress by Department</h3>
      <Bar data={data} options={options} />
      <ul className="mt-4">
        {projects.map((project, index) => (
          <li key={index} className="mb-2">
            <strong>Proyecto:</strong> {project.form_name} <br />
            <strong>Departamento:</strong> {project.department} <br />
            <strong>Fecha de inicio:</strong> {new Date(project.form_date_start).toLocaleDateString()} <br />
            <strong>Fecha de finalización:</strong> {new Date(project.form_date_finish).toLocaleDateString()} <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectProgressChart;
