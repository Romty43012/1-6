import { useAuth } from "../contexts/AuthContext";

export function useLoginState() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
}

