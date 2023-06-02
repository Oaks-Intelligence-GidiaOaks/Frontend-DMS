import React, { useContext, createContext, useState } from "react";
import secureLocalStorage from "react-secure-storage";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("home");
  const [sidebarShown, setSidebarShown] = useState(false);

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        sidebarShown,
        setSidebarShown,
        secureLocalStorage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
