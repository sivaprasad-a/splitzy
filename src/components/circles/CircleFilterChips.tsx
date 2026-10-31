"use client";

import { Chip, Stack } from "@mui/material";

import type { CircleGroupType } from "@/lib/domain/types";

const FILTERS: { label: string; value: CircleGroupType | "all" }[] = [
  { label: "All groups", value: "all" },
  { label: "Friends", value: "friends" },
  { label: "Roommates", value: "roommates" },
  { label: "Corporate", value: "corporate" },
];

export function CircleFilterChips({
  value,
  onChange,
}: {
  value: CircleGroupType | "all";
  onChange: (value: CircleGroupType | "all") => void;
}) {
  return (
    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
      {FILTERS.map((filter) => (
        <Chip
          key={filter.value}
          label={filter.label}
          onClick={() => onChange(filter.value)}
          color={value === filter.value ? "primary" : "default"}
          variant={value === filter.value ? "filled" : "outlined"}
        />
      ))}
    </Stack>
  );
}
