"use client";

import { useCallback, useEffect, useState } from "react";
import { authApi } from "../data/api";
import { getStoredAuthState } from "../data/storage";
import type { ActiveSession } from "../types/auth.types";

export function useDeviceSessions() {
  const [sessions, setSessions] = useState<ActiveSession[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const auth = getStoredAuthState();
    if (!auth?.sessionToken) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await authApi.listSessions(auth.sessionToken);
      if (res.ok) {
        setSessions(res.sessions ?? []);
      } else {
        setError(res.error ?? "No se pudieron cargar las sesiones.");
      }
    } catch {
      setError("No se pudieron cargar las sesiones.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const revoke = useCallback(async (sessionId: number) => {
    const auth = getStoredAuthState();
    if (!auth?.sessionToken) return { ok: false, error: "No session token" };
    const res = await authApi.revokeSession(auth.sessionToken, sessionId);
    if (res.ok) await refresh();
    return res;
  }, [refresh]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { sessions, isLoading, error, refresh, revoke };
}
