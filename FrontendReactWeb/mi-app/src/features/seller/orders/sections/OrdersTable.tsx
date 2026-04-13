"use client";
// src/feature/orders/sections/OrdersTable.tsx

import { Order, OrderStatus } from "../types/order.types";
import T from "../theme/ordersTheme";
import StatusBadge from "../ui/StatusBadge";
import ActionMenu  from "../ui/ActionMenu";

interface Props {
  orders:   Order[];
  onStatus: (id: string, status: OrderStatus) => void;
  onDelete: (id: string) => void;
  onView:   (order: Order) => void;
}

const COLS = ["Pedido", "Cliente", "Producto", "Cant.", "Total", "Fecha", "Estado", ""];

export default function OrdersTable({ orders, onStatus, onDelete, onView }: Props) {
  return (
    <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
          <thead>
            <tr style={{ background: T.bgAlt }}>
              {COLS.map((h, i) => (
                <th key={i} style={{
                  padding: "11px 14px", fontSize: 11, fontWeight: 700, color: T.text3,
                  textAlign: i === 3 ? "center" : "left",
                  textTransform: "uppercase", letterSpacing: "0.06em",
                  borderBottom: `1px solid ${T.border}`, whiteSpace: "nowrap",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: "40px", textAlign: "center", color: T.text3, fontSize: 14 }}>
                  No hay pedidos que coincidan
                </td>
              </tr>
            ) : orders.map((o) => (
              <tr key={o.id}
                style={{ borderBottom: `1px solid ${T.border}`, transition: "background .1s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = T.bgAlt)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "12px 14px" }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: T.brand600 }}>{o.id}</span>
                </td>
                <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 500, color: T.text1 }}>{o.client}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: T.text2, maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{o.product}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: T.text2, textAlign: "center" }}>{o.qty}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 700, color: T.text1 }}>RD$ {o.total.toLocaleString()}</td>
                <td style={{ padding: "12px 14px", fontSize: 12, color: T.text3, whiteSpace: "nowrap" }}>{o.date}</td>
                <td style={{ padding: "12px 14px" }}><StatusBadge status={o.status} /></td>
                <td style={{ padding: "12px 14px" }}>
                  <ActionMenu order={o} onStatus={onStatus} onDelete={onDelete} onView={onView} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ padding: "10px 16px", borderTop: `1px solid ${T.border}`, fontSize: 12, color: T.text3 }}>
        {orders.length} pedido{orders.length !== 1 ? "s" : ""} mostrado{orders.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}