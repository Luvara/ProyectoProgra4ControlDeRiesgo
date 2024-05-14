"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { User } from "../components/index";

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);

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
  }, [session, status]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
