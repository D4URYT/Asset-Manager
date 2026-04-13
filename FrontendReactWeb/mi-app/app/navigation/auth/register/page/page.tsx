import { RegisterPage } from "@/features/auth/register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro",
  description: "Crea una cuenta en Mi App para acceder a todas las funciones.",
};

export default function Page() {
  return <RegisterPage />;
}
