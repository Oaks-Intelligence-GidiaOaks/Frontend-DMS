import { useContext, createContext, useState } from "react";
import secureLocalStorage from "react-secure-storage";

const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(secureLocalStorage.getItem("user")) ?? null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    secureLocalStorage.getItem("oius")
  );

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
