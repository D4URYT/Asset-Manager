import { useEffect, useState } from "react";
import { setAuthTokenGetter } from "@workspace/api-client-react";
import { useLocation } from "wouter";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { getDefaultRouteForRole } from "@/lib/role-routing";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar: string | null;
};

function mapSupabaseUser(user: User | null): AuthUser | null {
  if (!user?.email) return null;

  const metadata = user.user_metadata ?? {};
  return {
    id: user.id,
    name:
      typeof metadata.name === "string" && metadata.name.trim()
        ? metadata.name
        : user.email.split("@")[0],
    email: user.email,
    role:
      typeof metadata.role === "string" && metadata.role.trim()
        ? metadata.role
        : "user",
    status: "active",
    avatar:
      typeof metadata.avatar === "string" && metadata.avatar.trim()
        ? metadata.avatar
        : null,
  };
}

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    setAuthTokenGetter(async () => {
      const { data } = await supabase.auth.getSession();
      return data.session?.access_token ?? null;
    });

    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return;
      setSession(data.session);
      setUser(mapSupabaseUser(data.session?.user ?? null));
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(mapSupabaseUser(nextSession?.user ?? null));
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = (nextSession: Session | null) => {
    const nextUser = mapSupabaseUser(nextSession?.user ?? null);
    setSession(nextSession);
    setUser(nextUser);
    setLocation(getDefaultRouteForRole(nextUser?.role));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setLocation("/login");
  };

  return {
    user,
    session,
    token: session?.access_token ?? null,
    isLoading,
    isAuthenticated: !!session && !!user,
    login: handleLogin,
    logout: handleLogout
  };
}
