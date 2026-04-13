import type { Metadata } from "next";
import OrdersPage from "@/features/seller/orders/OrdersClient";

export const metadata: Metadata = {
  title: "Pedidos vendedor",
};

export default function Page() {
  return <OrdersPage />;
}