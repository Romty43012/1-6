import { useState, useEffect } from "react";
export function useLoginState() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("isLoggedIn");
    if (saved === "true") setIsLoggedIn(true);
  }, []);
  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
  };
  return { isLoggedIn, login, logout };
}
