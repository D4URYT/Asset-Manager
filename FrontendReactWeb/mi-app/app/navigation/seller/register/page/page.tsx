import type { Metadata } from "next";
import { RegisterPage } from "@/features/auth/register/index";

export const metadata: Metadata = {
  title: "Register",
};

export default function Page() {
  return <RegisterPage />;
}
