import { Metadata } from 'next';
import ModerationPage from "../../../../../src/features/moderator/product_moderation/page/ModerationPage";

export const metadata: Metadata = {
  title: "Moderación de Productos",
  description: "Gestiona los productos registrados en la plataforma, revisa su información y toma decisiones de moderación."
}

export default function Page() {
  return <ModerationPage />;
}
