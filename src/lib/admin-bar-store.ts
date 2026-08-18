"use client";

import { useSyncExternalStore } from "react";

export const ADMIN_BAR_HEIGHT_PX = 36;

let visible = false;
const listeners = new Set<() => void>();

export function setVisible(value: boolean): void {
  if (visible === value) return;

  visible = value;
  if (typeof document !== "undefined") {
    document.documentElement.style.setProperty(
      "--admin-bar-offset",
      value ? "var(--admin-bar-height)" : "0px",
    );
  }
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): boolean {
  return visible;
}

export function getServerSnapshot(): boolean {
  return false;
}

export function useAdminBarVisible(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
