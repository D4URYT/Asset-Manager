"use client";
// src/feature/orders/hooks/useOrderFilters.ts

import { useState, useMemo } from "react";
import { Order, OrderStatus } from "../types/order.types";

type FilterKey = "all" | OrderStatus;

interface FilterCounts {
  all:       number;
  pending:   number;
  sent:      number;
  delivered: number;
  cancelled: number;
}

export function useOrderFilters(orders: Order[]) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [search, setSearch] = useState<string>("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return orders.filter((o) => {
      const matchStatus = filter === "all" || o.status === filter;
      const matchSearch =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.client.toLowerCase().includes(q) ||
        o.product.toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [orders, filter, search]);

  const counts = useMemo<FilterCounts>(
    () => ({
      all:       orders.length,
      pending:   orders.filter((o) => o.status === "pending").length,
      sent:      orders.filter((o) => o.status === "sent").length,
      delivered: orders.filter((o) => o.status === "delivered").length,
      cancelled: orders.filter((o) => o.status === "cancelled").length,
    }),
    [orders]
  );

  return { filter, setFilter, search, setSearch, filtered, counts };
}