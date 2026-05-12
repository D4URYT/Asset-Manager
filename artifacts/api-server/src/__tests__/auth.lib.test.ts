import { describe, it, expect, beforeEach } from "vitest";
import {
  hashPassword,
  verifyPassword,
  generateToken,
  storeToken,
  getUserIdFromToken,
  removeToken,
} from "../lib/auth.js";

describe("hashPassword / verifyPassword", () => {
  it("produces a hash that is not the original password", () => {
    const hash = hashPassword("secret123");
    expect(hash).not.toBe("secret123");
  });

  it("stores salt and hash separated by ':'", () => {
    const hash = hashPassword("mypassword");
    const parts = hash.split(":");
    expect(parts).toHaveLength(2);
    expect(parts[0]).toHaveLength(32);
    expect(parts[1]).toHaveLength(64);
  });

  it("verifies correct password", () => {
    const hash = hashPassword("correct-horse");
    expect(verifyPassword("correct-horse", hash)).toBe(true);
  });

  it("rejects wrong password", () => {
    const hash = hashPassword("correct-horse");
    expect(verifyPassword("wrong-password", hash)).toBe(false);
  });

  it("generates different hashes for the same password (random salt)", () => {
    const h1 = hashPassword("samepass");
    const h2 = hashPassword("samepass");
    expect(h1).not.toBe(h2);
    expect(verifyPassword("samepass", h1)).toBe(true);
    expect(verifyPassword("samepass", h2)).toBe(true);
  });

  it("returns false for malformed hash (no ':')", () => {
    expect(verifyPassword("any", "malformed-no-colon")).toBe(false);
  });

  it("returns false for empty stored hash", () => {
    expect(verifyPassword("any", "")).toBe(false);
  });
});

describe("generateToken", () => {
  it("generates a 64-character hex token", () => {
    const token = generateToken();
    expect(token).toMatch(/^[0-9a-f]{64}$/);
  });

  it("generates unique tokens each call", () => {
    const tokens = Array.from({ length: 20 }, generateToken);
    const unique = new Set(tokens);
    expect(unique.size).toBe(20);
  });
});

describe("token store (storeToken / getUserIdFromToken / removeToken)", () => {
  beforeEach(() => {
    removeToken("test-token-reset");
  });

  it("stores and retrieves a user ID for a token", () => {
    storeToken("tok-abc", 42);
    expect(getUserIdFromToken("tok-abc")).toBe(42);
    removeToken("tok-abc");
  });

  it("returns null for an unknown token", () => {
    expect(getUserIdFromToken("does-not-exist")).toBeNull();
  });

  it("removes a token so it is no longer valid", () => {
    storeToken("tok-del", 7);
    expect(getUserIdFromToken("tok-del")).toBe(7);
    removeToken("tok-del");
    expect(getUserIdFromToken("tok-del")).toBeNull();
  });

  it("allows overwriting an existing token with a new user ID", () => {
    storeToken("tok-over", 1);
    storeToken("tok-over", 99);
    expect(getUserIdFromToken("tok-over")).toBe(99);
    removeToken("tok-over");
  });

  it("silently ignores removeToken for a non-existent token", () => {
    expect(() => removeToken("ghost-token")).not.toThrow();
  });
});
