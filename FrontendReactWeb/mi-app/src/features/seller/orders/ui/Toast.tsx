"use client";
// src/feature/orders/ui/Toast.tsx

import { AlertTriangle, CheckCircle, Info, XCircle, type LucideIcon } from "lucide-react";
import T from "../theme/ordersTheme";

type ToastType = "success" | "error" | "warning" | "info";

interface Props {
  msg:   string;
  type?: ToastType;
}

const BG: Record<ToastType, string> = {
  success: T.success,
  error:   T.error,
  warning: T.warn,
  info:    T.brand600,
};

const ICONS: Record<ToastType, LucideIcon> = {
  success: CheckCircle,
  error:   XCircle,
  warning: AlertTriangle,
  info:    Info,
};

export default function Toast({ msg, type = "success" }: Props) {
  const Icon = ICONS[type];
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 999,
      background: BG[type], color: "#fff",
      padding: "12px 20px", borderRadius: 10,
      fontSize: 13, fontWeight: 600,
      boxShadow: "0 8px 24px rgba(0,0,0,.18)",
      animation: "toastIn .25s ease",
      pointerEvents: "none",
      display: "flex", alignItems: "center", gap: 8,
    }}>
      <Icon size={16} />
      {msg}
      <style>{`@keyframes toastIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}
