// ─────────────────────────────────────────────────────────────────────────────
// 🛡️ Moderación Feature — Barrel Export
// Importa siempre desde "@/features/moderacion", nunca desde rutas internas.
// Ejemplo: import { ModeracionPage } from "@/features/moderacion"
// ─────────────────────────────────────────────────────────────────────────────

export { default as ModerationPage } from "./page/ModerationPage";

export type {
  ProductoPendiente,
  ProductoStatus,
  FiltroStatus,
  AccionModeration,
} from "./types/moderation.types";