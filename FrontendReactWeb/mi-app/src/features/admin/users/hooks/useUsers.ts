import { useState, useEffect, useCallback } from "react";
import {
  apiGetResUsers,
  apiGetBillnovaUsers,
  apiDeleteResUser,
  apiDeleteBillnovaUser,
} from "../data/userApi";
import { mockResUsers, mockBillnovaUsers } from "../data/mockUsers";
import type { ResUser, BillnovaUser } from "../types/user.types";

export interface UseUsersReturn {
  resUsers:      ResUser[];
  billnovaUsers: BillnovaUser[];
  loading:       boolean;
  error:         string | null;
  deleting:      number | null;
  refresh:       () => Promise<void>;
  removeUser:    (resUserId: number) => Promise<void>;
}

export function useUsers(): UseUsersReturn {
  const [resUsers,      setResUsers]      = useState<ResUser[]>([]);
  const [billnovaUsers, setBillnovaUsers] = useState<BillnovaUser[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState<string | null>(null);
  const [deleting,      setDeleting]      = useState<number | null>(null);

  const USE_MOCK = true;

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 250));
      setResUsers(mockResUsers);
      setBillnovaUsers(mockBillnovaUsers);
      setLoading(false);
      return;
    }
    try {
      const [ru, bu] = await Promise.all([
        apiGetResUsers(),
        apiGetBillnovaUsers(),
      ]);
      setResUsers(ru);
      setBillnovaUsers(bu);
    } catch (e) {
      const msg = (e as Error).message;
      if (msg.toLowerCase().includes("failed to fetch")) {
        setError("No se pudo conectar con el servidor. Verifica que la API esté en línea.");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const removeUser = useCallback(async (resUserId: number) => {
    setDeleting(resUserId);
    if (USE_MOCK) {
      setResUsers((prev) => prev.filter((u) => u.id !== resUserId));
      setBillnovaUsers((prev) => prev.filter((u) => u.res_user_id !== resUserId));
      setDeleting(null);
      return;
    }
    try {
      // Primero elimina billnova.user (el cascade lo haría igual, pero lo hacemos explícito)
      const bu = billnovaUsers.find((b) => b.res_user_id === resUserId);
      if (bu) await apiDeleteBillnovaUser(bu.id);
      await apiDeleteResUser(resUserId);
      await refresh();
    } catch (e) {
      const msg = (e as Error).message;
      if (msg.toLowerCase().includes("failed to fetch")) {
        setError("No se pudo conectar con el servidor. Verifica que la API esté en línea.");
      } else {
        setError(msg);
      }
    } finally {
      setDeleting(null);
    }
  }, [billnovaUsers, refresh]);

  return { resUsers, billnovaUsers, loading, error, deleting, refresh, removeUser };
}
