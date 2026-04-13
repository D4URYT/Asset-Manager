import type { Metadata } from "next";
import { DashboardPage } from "@/features/seller/dashboard";

export const metadata: Metadata = {
  title: "Dashboard vendedor",
};

export default function Page() {
  return <DashboardPage />;
}
