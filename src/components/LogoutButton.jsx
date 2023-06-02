import { Logout } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { useApp, useAuth } from "../context";
import { useContext } from "react";
import EnumeratorFormContext from "../context/enumeratorFormContext";
import { base_url } from "../lib/paths";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useAuth();
  const { secureLocalStorage } = useApp();

  const activeStyle = "bg-oaksgreen text-white flex items-center p-3 rounded-l";
  const normalStyle = "flex items-center p-3 rounded-l";

  const logOut = () => {
    secureLocalStorage.clear();
    return navigate("/");
  };

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div
      onClick={() => {
        secureLocalStorage.clear();
        setIsLoggedIn(null);
        setUser(null);
        navigate("/");
      }}
      className="flex items-center p-3 cursor-pointer"
    >
      <Logout className="h-4 w-4" />
      <span className="pl-3 capitalize ">Logout</span>
    </div>
  );
};

export default LogoutButton;
