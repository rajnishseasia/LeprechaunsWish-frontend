import { useEffect } from "react";
import { checkLogin } from "@/lib/constants";
import { useDisconnect } from "wagmi";

const AuthProvider = ({ children }) => {
  const { disconnect } = useDisconnect();

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!checkLogin(token)) {
      disconnect();
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    checkAuth(); // Run once immediately on mount
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
