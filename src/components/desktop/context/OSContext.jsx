"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

function formatUpTime(uptimeMS) {
  const totalSeconds = Math.max(0, Math.floor(uptimeMs / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  return `${hours}h ${minutes}m ${seconds}s`;
}

function buildSystemReport(uptimeMs) {
  return [
    ...SYSTEM_SPECS,
    ["Uptime", formatUptime(uptimeMs)],
  ]
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
}

export function OSProvider({ children }) {
    
}
