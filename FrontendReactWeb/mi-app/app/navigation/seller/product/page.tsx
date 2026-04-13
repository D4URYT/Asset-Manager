import type { Metadata } from "next";
import { ProductosPage } from "@/features/product";

export const metadata: Metadata = {
  title: "Productos",
};

export default function Page() {
  return <ProductosPage />;
}