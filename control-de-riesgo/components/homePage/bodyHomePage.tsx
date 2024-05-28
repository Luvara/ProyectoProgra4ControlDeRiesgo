import React, { useEffect, useState } from "react";
import UserFormStatus from "./charts/userFormStatus";
import UserInfo from "./charts/userInfo";
import FormProgressChart from "./charts/FormProgressChart";
import SubordinatesList from "./charts/SubordinatesList";
import { useUser } from "../../lib/userContext";
import { EmployeeResponse, FormResponse, FormProgressResponse } from "../index";

const BodyHomePage: React.FC = () => {
  const { user } = useUser();
  const [userFormData, setUserFormData] = useState<FormResponse | null>(null);
  const [userData, setUserData] = useState<EmployeeResponse | null>(null);
  const [formProgress, setFormProgress] = useState<FormProgressResponse | null>(
    null
  );

  useEffect(() => {
    if (user) {
      const fetchUserFormData = async () => {
        try {
          const response = await fetch(
            `/api/dashboard/employee/getFormStatus?id=${user.usu_id}`
          );
          const data: FormResponse | null = await response.json();
          setUserFormData(data);
        } catch (error) {
          console.error("Error fetching user form data:", error);
        }
      };
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `/api/dashboard/employee/getEmployee?id=${user.usu_id}`
          );
          const data: EmployeeResponse = await response.json();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching employee:", error);
        }
      };
      const fetchFormProgress = async () => {
        try {
          const response = await fetch(
            `/api/dashboard/employee/getFormProgress?id=${user.usu_id}`
          );
          const data: FormProgressResponse = await response.json();
          setFormProgress(data);
        } catch (error) {
          console.error("Error fetching form progress:", error);
        }
      };
      fetchUserData();
      fetchUserFormData();
      fetchFormProgress();
    }
  }, [user]);

  if (!userData || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container px-5 py-14 mx-auto rounded-lg bg-background-2 body-font">
      <div className="flex flex-wrap w-full mb-10 flex-col items-center text-center">
        <h1 className="md:text-5xl text-3xl font-bold title-font mb-2 text-white">
          Employee Dashboard
        </h1>
      </div>
      {user.userType_usut_id === 5 && (
        <div className="flex flex-col md:flex-row justify-between items-center md:flex-wrap">
          <UserInfo userData={userData} />
          <UserFormStatus userFormData={userFormData} />
          {formProgress ? (
            <FormProgressChart formProgress={formProgress} />
          ) : (
            <div className="my-4 w-full md:w-2/5 md:flex md:justify-between bg-background-3 shadow-lg rounded-lg p-5 text-white">
              <div className="w-full">
                <h3 className="text-lg font-semibold mb-3">No Active Forms</h3>
              </div>
            </div>
          )}
        </div>
      )}
      {user.userType_usut_id === 4 && (
        <div className="flex flex-col md:flex-row justify-between items-center md:flex-wrap">
          <SubordinatesList />
        </div>
      )}
    </div>
  );
};

export default BodyHomePage;
