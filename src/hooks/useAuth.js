import { useAuthContext } from "@/contexts/AuthContext";

export const useAuth = () => {
  const context = useAuthContext();
  if (!context) {
    throw new Error("Context is empty");
  }
  return context;
};
