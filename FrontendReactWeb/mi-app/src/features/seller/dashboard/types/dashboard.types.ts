"use client";

import React from "react";
import { type LucideIcon } from "lucide-react";

export type StockStatus = "ok" | "bajo" | "agotado";
export type InvoiceStatus = "pagada" | "pendiente" | "vencida";

export interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  stockStatus: StockStatus;
  price: string;
  invoice: string;
  invoiceStatus: InvoiceStatus;
  date: string;
}

export interface StatCard {
  label: string;
  value: string;
  Icon: LucideIcon;
  delta: string;
  color: string;
  bg: string;
}

export interface NavItem {
  id: string;
  Icon: LucideIcon;
  label: string;
  href: string;
}

export interface DashboardTheme {
  brand600: string;
  brand700: string;
  brand400: string;
  brand100: string;
  bgMain: string;
  bgCard: string;
  bgAlt: string;
  textPrimary: string;
  textSecondary: string;
  textDisabled: string;
  success: string;
  successBg: string;
  error: string;
  errorBg: string;
  warning: string;
  warningBg: string;
  border: string;
}
