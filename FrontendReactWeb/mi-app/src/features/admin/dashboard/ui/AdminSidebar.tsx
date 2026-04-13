"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield } from "lucide-react";
import { colors, font } from "../../users/theme/tokens";
import type { AdminNavItemData } from "../data/adminNavigation.data";

interface AdminSidebarProps {
  navItems: AdminNavItemData[];
}

export function AdminSidebar({ navItems }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: 220,
        background: colors.bg.secondary,
        borderRight: `1px solid ${colors.border}`,
        display: "flex",
        flexDirection: "column",
        padding: "24px 16px",
        position: "sticky",
        top: 0,
        height: "100vh",
        fontFamily: font.family,
      }}
    >
      {/* Logo */}
      <div style={{ padding: "0 8px 28px", borderBottom: `1px solid ${colors.border}` }}>
        <Link href="/navigation/admin/dashboard/page" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                background: `linear-gradient(135deg, ${colors.brand[600]}, ${colors.brand[400]})`,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              <Shield size={18} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: colors.text.primary }}>
                BizAdmin
              </div>
              <div style={{ fontSize: 10, color: colors.text.disabled, letterSpacing: "0.05em" }}>
                ENTERPRISE
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Nav Links */}
      <nav
        style={{
          marginTop: 20,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: colors.text.disabled,
            letterSpacing: "0.1em",
            padding: "0 8px",
            marginBottom: 8,
          }}
        >
          MENU PRINCIPAL
        </div>

        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link key={item.id} href={item.href} style={{ textDecoration: "none" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 16px",
                  borderRadius: 10,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontSize: 14,
                  fontWeight: 500,
                  color: isActive ? colors.brand[600] : colors.text.secondary,
                  background: isActive ? colors.brand[100] : "transparent",
                }}
              >
                <item.Icon size={18} />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User Avatar */}
      <div
        style={{
          marginTop: "auto",
          padding: "12px",
          background: colors.bg.alt,
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${colors.brand[600]}, ${colors.brand[400]})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            color: "white",
            fontWeight: 700,
          }}
        >
          AD
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: colors.text.primary }}>
            Admin Demo
          </div>
          <div style={{ fontSize: 10, color: colors.text.disabled }}>
            Administrador
          </div>
        </div>
      </div>
    </aside>
  );
}
