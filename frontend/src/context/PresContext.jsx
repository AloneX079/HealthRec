import { createContext, useState } from "react";

export const PresContextProvider = createContext();

const PresContext = ({ children }) => {
  const [Pres, setPres] = useState(null);

  return (
    <PresContextProvider.Provider
      value={{
        Pres,
        setPres,
      }}
    >
      {children}
    </PresContextProvider.Provider>
  );
};

export default PresContext;
