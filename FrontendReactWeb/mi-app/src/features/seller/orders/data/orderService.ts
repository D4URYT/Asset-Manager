// src/feature/orders/data/orderService.ts

import { Order, OrderStatus } from "../types/order.types";
import mockOrders from "./mockOrders";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function fetchOrders(): Promise<Order[]> {
  if (!BASE_URL) return mockOrders;
  const res = await fetch(`${BASE_URL}/api/orders`, { cache: "no-store" });
  if (!res.ok) throw new Error("Error al obtener pedidos");
  return res.json();
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<{ id: string; status: OrderStatus }> {
  if (!BASE_URL) return { id, status };
  const res = await fetch(`${BASE_URL}/api/orders/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Error al actualizar estado");
  return res.json();
}

export async function deleteOrder(id: string): Promise<{ success: boolean }> {
  if (!BASE_URL) return { success: true };
  const res = await fetch(`${BASE_URL}/api/orders/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar pedido");
  return res.json();
}