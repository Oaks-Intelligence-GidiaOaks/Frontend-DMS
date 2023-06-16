import { useContext, createContext, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";
import { base_url, base_url_local } from "../lib/paths";


const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(secureLocalStorage.getItem("user")) ?? null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    secureLocalStorage.getItem("oius")
  );

  const logOut = () => {
    try {
      fetch(`${base_url}logout`)
        .then((res) => res.json())
        .then(({ success }) => {
          if (success) {
            secureLocalStorage.clear();
            setUser(null);
            setIsLoggedIn(false);
            return navigate("/");
          }
        })
        .catch((error) => {
          secureLocalStorage.clear();
          setUser(null);
          setIsLoggedIn(false);
          return navigate("/");
        });
    } catch (err) {
      secureLocalStorage.clear();
      setUser(null);
      setIsLoggedIn(false);
      return navigate("/");
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
