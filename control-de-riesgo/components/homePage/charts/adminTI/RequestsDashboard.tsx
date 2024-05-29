import React, { useEffect, useState } from "react";
import { useRequest } from "../../../../lib/requestContext";
import { useUser } from "../../../../lib/userContext";

interface UserRequest {
  usu_id: number;
  usu_name: string;
  usu_email: string;
  usu_idnumber: string;
  usertype: {
    usut_role: string;
  };
}

const RequestsDashboard: React.FC = () => {
  const { user } = useUser();
  const { fetchTIRequestCount } = useRequest();
  const [tiRequests, setTIRequests] = useState<UserRequest[]>([]);
  const [coordinatorRequests, setCoordinatorRequests] = useState<UserRequest[]>(
    []
  );
  const [totalTIRequests, setTotalTIRequests] = useState(0);
  const [totalCoordinatorRequests, setTotalCoordinatorRequests] = useState(0);

  useEffect(() => {
    if (user?.userType_usut_id === 2) {
      fetchTIRequestCount();
      fetchRequests();
    }
  }, [user]);

  const fetchRequests = async () => {
    try {
      const response = await fetch(`/api/adminTI?checkPermissions=true`);
      const data: UserRequest[] = await response.json();

      const tiRequests = data.filter(
        (user) => user.usertype.usut_role === "Admin de TI"
      );
      const coordinatorRequests = data.filter(
        (user) => user.usertype.usut_role === "Coordinador Interno"
      );

      setTotalTIRequests(tiRequests.length);
      setTotalCoordinatorRequests(coordinatorRequests.length);

      setTIRequests(tiRequests.slice(0, 5)); // Show first 5 TI requests
      setCoordinatorRequests(coordinatorRequests.slice(0, 5)); // Show first 5 Coordinator requests
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  return (
    <div className="container px-5 py-14 mx-auto rounded-lg bg-background-2 body-font">
      <div className="flex flex-wrap w-full mb-10 flex-col items-center text-center">
        <h1 className="md:text-5xl text-3xl font-bold title-font mb-2 text-white">
          Admin Dashboard
        </h1>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center md:flex-wrap">
        <RequestList
          title="TI Admin Requests"
          count={totalTIRequests}
          requests={tiRequests}
          fetchRequests={fetchRequests}
        />
        <RequestList
          title="Coordinator Requests"
          count={totalCoordinatorRequests}
          requests={coordinatorRequests}
          fetchRequests={fetchRequests}
        />
      </div>
    </div>
  );
};

const RequestList: React.FC<{
  title: string;
  count: number;
  requests: UserRequest[];
  fetchRequests: () => void;
}> = ({ title, count, requests, fetchRequests }) => (
  <div className="my-4 w-full md:w-2/5 md:flex md:justify-between bg-background-3 shadow-lg rounded-lg p-5 text-white">
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-3">
        {title} (Total: {count})
      </h3>
      {requests.length > 0 ? (
        <ul>
          {requests.map((request) => (
            <li key={request.usu_id} className="mb-2">
              <strong>Name:</strong> {request.usu_name} <br />
              <strong>Email:</strong> {request.usu_email} <br />
              <strong>ID Number:</strong> {request.usu_idnumber} <br />
            </li>
          ))}
        </ul>
      ) : (
        <p>No requests found.</p>
      )}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 rounded-lg text-white"
        onClick={fetchRequests}
      >
        Refresh
      </button>
    </div>
  </div>
);

export default RequestsDashboard;
