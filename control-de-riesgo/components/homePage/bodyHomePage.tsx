import React from "react";
import UserFormStatus from "./charts/employee/userFormStatus";
import UserInfo from "./charts/employee/userInfo";
import FormProgressChart from "./charts/employee/FormProgressChart";
import SubordinatesList from "./charts/boss/SubordinatesList";
import RespondentsList from "./charts/coordinator/RespondentsList";
import ProjectProgressChart from "./charts/coordinator/ProjectProgressChart";
import RequestsDashboard from "./charts/adminTI/RequestsDashboard";
import { useUser } from "../../lib/userContext";

const BodyHomePage: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="container px-5 py-14 mx-auto rounded-lg bg-background-2 body-font">
      <div className="flex flex-wrap w-full mb-10 flex-col items-center text-center">
        <h1 className="md:text-5xl text-3xl font-bold title-font mb-2 text-white">
          Dashboard
        </h1>
      </div>
      {user?.userType_usut_id === 5 && (
        <div className="flex flex-col md:flex-row justify-between items-center md:flex-wrap">
          <UserInfo />
          <UserFormStatus />
          <FormProgressChart />
        </div>
      )}
      {user?.userType_usut_id === 4 && (
        <div className="flex flex-col md:flex-row justify-between items-center md:flex-wrap">
          <UserInfo />
          <UserFormStatus />
          <FormProgressChart />
          <SubordinatesList />
        </div>
      )}
      {user?.userType_usut_id === 3 && (
        <div className="flex flex-col md:flex-row justify-between items-center md:flex-wrap">
          <UserInfo />
          <RespondentsList />
          <ProjectProgressChart />
        </div>
      )}
      {user?.userType_usut_id === 2 && (
        <div className="flex flex-col md:flex-row justify-between items-center md:flex-wrap">
          <UserInfo />
          <RequestsDashboard />
        </div>
      )}
    </div>
  );
};

export default BodyHomePage;
