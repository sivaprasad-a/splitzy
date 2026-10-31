"use client";

import { Box, Button } from "@mui/material";

import type { SplitMode } from "@/lib/domain/types";

const MODES: { value: SplitMode; label: string }[] = [
  { value: "equal", label: "Equal" },
  { value: "percentage", label: "Percentage" },
  { value: "exact", label: "Exact" },
  { value: "shares", label: "Shares" },
];

export function SplitModeTabs({ value, onChange }: { value: SplitMode; onChange: (mode: SplitMode) => void }) {
  return (
    <Box sx={{ display: "flex", bgcolor: "#EDF4FB", borderRadius: "12px", p: "4px", mb: 2 }}>
      {MODES.map((mode) => {
        const on = value === mode.value;
        return (
          <Button
            key={mode.value}
            onClick={() => onChange(mode.value)}
            sx={{
              flex: 1,
              minWidth: 0,
              py: "10px",
              borderRadius: "9px",
              fontSize: 11,
              fontWeight: 800,
              textTransform: "none",
              color: on ? "primary.main" : "#899CB5",
              bgcolor: on ? "white" : "transparent",
              boxShadow: on ? "0 2px 9px rgba(17,44,75,0.08)" : "none",
              "&:hover": { bgcolor: on ? "white" : "transparent" },
            }}
          >
            {mode.label}
          </Button>
        );
      })}
    </Box>
  );
}
