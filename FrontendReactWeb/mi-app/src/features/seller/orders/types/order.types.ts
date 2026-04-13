// src/feature/orders/types/order.types.ts

export type OrderStatus = "pending" | "sent" | "delivered" | "cancelled";

export interface Order {
  id:      string;
  client:  string;
  product: string;
  qty:     number;
  total:   number;
  date:    string;
  status:  OrderStatus;
  address: string;
  phone:   string;
}

export const STATUS_LABELS: Record<OrderStatus, string> = {
  pending:   "Pendiente",
  sent:      "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

export const ALL_STATUSES: OrderStatus[] = [
  "pending",
  "sent",
  "delivered",
  "cancelled",
];