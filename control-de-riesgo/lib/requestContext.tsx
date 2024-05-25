"use client";
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface RequestContextType {
  requestCount: number;
  fetchRequestCount: () => void;
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
  const [requestCount, setRequestCount] = useState(0);

  const fetchRequestCount = async () => {
    try {
      const response = await fetch(`/api/adminTI?checkPermissions=true`);
      const data = await response.json();
      setRequestCount(data.length);
    } catch (error) {
      console.error("Error fetching request count:", error);
    }
  };

  useEffect(() => {
    fetchRequestCount();
  }, []);

  return (
    <RequestContext.Provider value={{ requestCount, fetchRequestCount }}>
      {children}
    </RequestContext.Provider>
  );
};
