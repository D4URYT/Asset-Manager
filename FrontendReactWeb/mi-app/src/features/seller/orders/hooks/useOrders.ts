"use client";
// src/feature/orders/hooks/useOrders.ts

import { useState, useCallback } from "react";
import { Order, OrderStatus } from "../types/order.types";
import mockOrders from "../data/mockOrders";

export function useOrders() {
  const [orders, setOrders]     = useState<Order[]>(mockOrders);
  const [loading, setLoading]   = useState<boolean>(false);
  const [error,   setError]     = useState<string | null>(null);

  const updateStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  }, []);

  const removeOrder = useCallback((id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  }, []);

  const addOrder = useCallback((order: Order) => {
    setOrders((prev) => [order, ...prev]);
  }, []);

  return { orders, loading, error, updateStatus, removeOrder, addOrder };
}