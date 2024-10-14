import React, { createContext, useEffect, useState } from "react";

import providers from "../data/providers.json";

const DoctorsContext = createContext();

const DoctorsProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    setDoctors(providers.providers);
  }, []);

  return (
    <DoctorsContext.Provider value={doctors}>
      {children}
    </DoctorsContext.Provider>
  );
};

export { DoctorsContext, DoctorsProvider };
