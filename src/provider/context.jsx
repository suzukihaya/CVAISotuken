import React, { createContext, useState } from "react";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobData, setJobData] = useState({
    department: "",
    location: [],
    features: [],
    qualifications: [],
  });

  return (
    <JobContext.Provider value={{ jobData, setJobData }}>
      {children}
    </JobContext.Provider>
  );
};