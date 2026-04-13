import { DashboardModPage } from "@/features/moderator/dashboard/DashboardModPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Moderation",
  description: "Dashboard Moderation",
};

export default function Page() {
    return <DashboardModPage />;
}