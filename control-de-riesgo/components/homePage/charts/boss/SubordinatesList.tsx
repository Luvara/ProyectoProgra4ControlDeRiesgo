import React, { useEffect, useState } from 'react';
import { useUser } from '../../../../lib/userContext';
import { User } from '../../../index';

const SubordinatesList: React.FC = () => {
  const { user } = useUser();
  const [subordinates, setSubordinates] = useState<User[]>([]);

  useEffect(() => {
    if (user) {
      const fetchSubordinates = async () => {
        try {
          const response = await fetch(`/api/dashboard/boss/getSubordinates?department=${user.department_dep_id}`);
          const data: User[] = await response.json();
          setSubordinates(data);
        } catch (error) {
          console.error('Error fetching subordinates:', error);
        }
      };
      fetchSubordinates();
    }
  }, [user]);

  return (
    <div className="my-4 w-full p-5 text-white text-center bg-nodes">
      <h3 className="text-lg font-semibold mb-3">Usuarios con permiso para responder</h3>
      <ul>
        {subordinates.map((subordinate) => (
          <li key={subordinate.usu_id} className="mb-2">
            <strong>Nombre:</strong> {subordinate.usu_name} <br />
            <strong>Correo:</strong> {subordinate.usu_email} <br />
            <strong>ID:</strong> {subordinate.usu_idnumber} <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubordinatesList;
