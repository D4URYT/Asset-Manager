"use client";
// src/feature/orders/sections/OrdersFilters.tsx

import { Search } from "lucide-react";
import { OrderStatus } from "../types/order.types";
import T from "../theme/ordersTheme";

type FilterKey = "all" | OrderStatus;

interface Tab {
  key:   FilterKey;
  label: string;
}

const TABS: Tab[] = [
  { key: "all",       label: "Todos"      },
  { key: "pending",   label: "Pendientes" },
  { key: "sent",      label: "Enviados"   },
  { key: "delivered", label: "Entregados" },
  { key: "cancelled", label: "Cancelados" },
];

interface Props {
  counts:    Record<FilterKey, number>;
  filter:    FilterKey;
  setFilter: (f: FilterKey) => void;
  search:    string;
  setSearch: (s: string) => void;
}

export default function OrdersFilters({ counts, filter, setFilter, search, setSearch }: Props) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
      <div style={{ display: "flex", gap: 3, background: T.bgAlt, padding: 4, borderRadius: 10, flexWrap: "wrap" }}>
        {TABS.map((t) => {
          const active = filter === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              style={{
                padding: "6px 13px", borderRadius: 7, border: "none",
                background: active ? T.brand600 : "transparent",
                color: active ? "#fff" : T.text2,
                fontSize: 12, fontWeight: 600, cursor: "pointer",
                transition: "all .15s", fontFamily: "inherit", whiteSpace: "nowrap",
              }}
            >
              {t.label} <span style={{ opacity: 0.65, fontSize: 11 }}>({counts[t.key] ?? 0})</span>
            </button>
          );
        })}
      </div>

      <div style={{ position: "relative" }}>
        <Search size={14} color={T.text3} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar pedido, cliente..."
          style={{
            padding: "8px 14px 8px 30px", borderRadius: 8, border: `1px solid ${T.border}`,
            fontSize: 13, color: T.text1, background: T.bgCard,
            outline: "none", width: 230, fontFamily: "inherit",
          }}
          onFocus={(e)  => (e.currentTarget.style.borderColor = T.brand400)}
          onBlur={(e)   => (e.currentTarget.style.borderColor = T.border)}
        />
      </div>
    </div>
  );
}