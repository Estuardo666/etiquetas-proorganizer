"use client";

import type { ReactNode } from "react";
import { useAdminBarVisible } from "@/lib/admin-bar-store";

export function NavbarWrapper({ children }: { children: ReactNode }) {
  const adminBarVisible = useAdminBarVisible();

  return (
    <div
      className="sticky z-50 transition-[top] duration-200 motion-reduce:transition-none"
      style={{ top: adminBarVisible ? "var(--admin-bar-height)" : 0 }}
    >
      {children}
    </div>
  );
}
