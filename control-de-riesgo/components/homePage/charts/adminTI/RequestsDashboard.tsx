import React, { useEffect, useState } from "react";
import { useRequest } from "../../../../lib/requestContext";
import { useUser } from "../../../../lib/userContext";
import RequestList from "./RequestList";

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
  const [coordinatorRequests, setCoordinatorRequests] = useState<UserRequest[]>([]);
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
          Administrador Dashboard
        </h1>
      </div>
      <div className="flex flex-col items-center">
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

export default RequestsDashboard;
