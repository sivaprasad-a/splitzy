"use client";

import { Tabs, Tab } from "@mui/material";

import type { SplitMode } from "@/lib/domain/types";

const MODES: { value: SplitMode; label: string }[] = [
  { value: "equal", label: "Equal" },
  { value: "percentage", label: "Percentage" },
  { value: "exact", label: "Exact" },
  { value: "shares", label: "Shares" },
];

export function SplitModeTabs({ value, onChange }: { value: SplitMode; onChange: (mode: SplitMode) => void }) {
  return (
    <Tabs
      value={value}
      onChange={(_, next: SplitMode) => onChange(next)}
      sx={{ minHeight: 0, mb: 2 }}
      variant="scrollable"
    >
      {MODES.map((mode) => (
        <Tab key={mode.value} value={mode.value} label={mode.label} sx={{ minHeight: 0, textTransform: "none" }} />
      ))}
    </Tabs>
  );
}
