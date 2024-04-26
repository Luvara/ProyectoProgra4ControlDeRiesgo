import SurveyOverview from "./surveyOverview";
import UserResponseChart from "./userResponseChart";
import DepartmentCompletionChart from "./departmentCompletionChart";

const departmentData = [
  { name: "Department A", percentage: 75 },
  { name: "Department B", percentage: 60 },
  { name: "Department C", percentage: 90 },
  { name: "Department D", percentage: 50 },
  { name: "Department F", percentage: 80 },
];

const userData = [
  { name: "Alice", responses: 5 },
  { name: "Bob", responses: 14 },
  { name: "Charlie", responses: 6 },
  { name: "David", responses: 5 },
  { name: "Alice", responses: 2 },
  { name: "Bob", responses: 1 },
  { name: "Charlie", responses: 8 },
  { name: "David", responses: 11 },
  { name: "Alice", responses: 7 },
  { name: "Bob", responses: 4 },
  { name: "Charlie", responses: 3 },
  { name: "David", responses: 8 },
];

const BodyHomePage: React.FC = () => {
  return (
    <div className="container px-5 py-14 mx-auto rounded-lg bg-background-2 body-font">
      <div className="flex flex-wrap w-full mb-10 flex-col items-center text-center">
        <h1 className="md:text-5xl text-3xl font-bold title-font mb-2 text-white">
          Self-assessment module
        </h1>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center md:flex-wrap">
        <SurveyOverview
          completed={120}
          total={200}
          lastRespondents={["Alice", "Bob", "Charlie", "Diana", "Eve"]}
        />
        <UserResponseChart userData={userData} />

        <DepartmentCompletionChart departmentData={departmentData} />
      </div>
    </div>
  );
};

export default BodyHomePage;
