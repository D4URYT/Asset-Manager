import { useEffect, useState } from "react";
import { useGetMe, getGetMeQueryKey, setAuthTokenGetter } from "@workspace/api-client-react";
import { useLocation } from "wouter";

export function useAuth() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("auth_token"));
  const [, setLocation] = useLocation();

  useEffect(() => {
    setAuthTokenGetter(() => localStorage.getItem("auth_token"));
  }, []);

  const handleLogin = (newToken: string) => {
    localStorage.setItem("auth_token", newToken);
    setToken(newToken);
    setLocation("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setToken(null);
    setLocation("/login");
  };

  const { data: user, isLoading, isError } = useGetMe({
    query: {
      queryKey: getGetMeQueryKey(),
      enabled: !!token,
      retry: false,
    }
  });

  useEffect(() => {
    if (isError) {
      handleLogout();
    }
  }, [isError]);

  return {
    user,
    token,
    isLoading: isLoading && !!token,
    isAuthenticated: !!user && !!token,
    login: handleLogin,
    logout: handleLogout
  };
}
