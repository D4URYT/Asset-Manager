import fs from "node:fs";
import path from "node:path";

let didLoadRootEnv = false;

export function loadRootEnvFile(): void {
  if (didLoadRootEnv) return;
  didLoadRootEnv = true;

  const envPath = path.resolve(import.meta.dirname, "../../../../.env");
  if (!fs.existsSync(envPath)) return;

  const content = fs.readFileSync(envPath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (!key || process.env[key] !== undefined) continue;

    process.env[key] = value;
  }
}
