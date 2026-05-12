export type AppRole = "admin" | "manager" | "user";

export function normalizeRole(role: string | null | undefined): AppRole {
  switch (role?.trim().toLowerCase()) {
    case "admin":
      return "admin";
    case "manager":
      return "manager";
    default:
      return "user";
  }
}

export function getDefaultRouteForRole(role: string | null | undefined): string {
  switch (normalizeRole(role)) {
    case "admin":
      return "/users";
    case "manager":
      return "/";
    case "user":
      return "/products";
  }
}

export function canAccessRoute(role: string | null | undefined, path: string): boolean {
  const normalizedRole = normalizeRole(role);

  switch (path) {
    case "/":
    case "/settings":
      return true;
    case "/users":
      return normalizedRole === "admin";
    case "/products":
      return normalizedRole === "admin" || normalizedRole === "manager" || normalizedRole === "user";
    case "/customers":
    case "/posts":
      return normalizedRole === "admin" || normalizedRole === "manager";
    default:
      return false;
  }
}
