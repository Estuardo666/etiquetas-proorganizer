"use client";

import type { ReactNode } from "react";
import { useAdminBarVisible } from "@/lib/admin-bar-store";

export function AdminBarLayout({ children }: { children: ReactNode }) {
  const visible = useAdminBarVisible();

  return (
    <div
      data-admin-bar-visible={visible ? "true" : "false"}
      className="transition-[padding-top] duration-200 motion-reduce:transition-none"
      style={{ paddingTop: visible ? "var(--admin-bar-height)" : 0 }}
    >
      {children}
    </div>
  );
}
