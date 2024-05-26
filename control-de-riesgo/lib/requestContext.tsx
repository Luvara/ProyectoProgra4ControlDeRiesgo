"use client";
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface RequestContextType {
  tiRequestCount: number;
  coordinatorRequestCount: number;
  fetchTIRequestCount: () => void;
  fetchCoordinatorRequestCount: () => void;
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

export const useRequest = () => {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error("useRequest must be used within a RequestProvider");
  }
  return context;
};

export const RequestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tiRequestCount, setTIRequestCount] = useState(0);
  const [coordinatorRequestCount, setCoordinatorRequestCount] = useState(0);

  const fetchTIRequestCount = async () => {
    try {
      const response = await fetch(`/api/adminTI?checkPermissions=true`);
      const data = await response.json();
      setTIRequestCount(data.length);
    } catch (error) {
      console.error("Error fetching TI request count:", error);
    }
  };

  const fetchCoordinatorRequestCount = async () => {
    try {
      const response = await fetch(`/api/adminCoordinator?checkPermissions=true`);
      const data = await response.json();
      setCoordinatorRequestCount(data.length);
    } catch (error) {
      console.error("Error fetching Coordinator request count:", error);
    }
  };

  useEffect(() => {
    fetchTIRequestCount();
    fetchCoordinatorRequestCount();
  }, []);

  return (
    <RequestContext.Provider value={{ tiRequestCount, coordinatorRequestCount, fetchTIRequestCount, fetchCoordinatorRequestCount }}>
      {children}
    </RequestContext.Provider>
  );
};
