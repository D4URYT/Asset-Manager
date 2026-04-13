import type { Metadata } from "next";
import { UsersPage } from "../../../../../src/features/admin/users/UsersPage";

export const metadata: Metadata = {
  title: "Usuarios",
  description:
    "Administra los usuarios de tu aplicación. Agrega, edita o elimina cuentas de usuario, asigna roles y permisos, y gestiona la información de contacto. Mantén el control total sobre quién tiene acceso a tu aplicación y sus funcionalidades.",
};

export default function Page() {
  return (
    <main style={{ minHeight: "100vh", background: "#F8FAFC" }}>
      <UsersPage />
    </main>
  );
}
