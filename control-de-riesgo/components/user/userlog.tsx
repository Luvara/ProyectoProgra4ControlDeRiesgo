import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { User } from "../../components/index";

const UserLog = () => {
  const { data: session, status } = useSession();
  // Ajuste aquí para incluir `null` en el tipo de estado.
  const [user, setUser] = useState<User | null>(null); // Permitir `null`

  useEffect(() => {
    // Solo ejecuta el fetch cuando la sesión está activa y el email del usuario está disponible
    if (status === "authenticated" && session?.user?.email) {
      fetch(`/api/users/""/""/${session.user.email}`) // Asegúrate que la ruta sea correcta
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.error("Error loading the data", error);
          setUser(null); // Manejo opcional para resetear el estado en caso de error
        });
    }
  }, [session, status]); // Agrega `session` y `status` como dependencias del useEffect

  // Retorna nulo o el contenido relevante dependiendo de si hay usuario
  return user;
};

export default UserLog;
