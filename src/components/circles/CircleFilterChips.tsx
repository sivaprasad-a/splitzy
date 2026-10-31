"use client";

import { Button, Stack } from "@mui/material";

import type { CircleGroupType } from "@/lib/domain/types";

const FILTERS: { label: string; value: CircleGroupType | "all" }[] = [
  { label: "All", value: "all" },
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
    <Stack direction="row" spacing="8px" sx={{ mb: "20px", flexWrap: "wrap" }}>
      {FILTERS.map((filter) => {
        const on = value === filter.value;
        return (
          <Button
            key={filter.value}
            onClick={() => onChange(filter.value)}
            sx={{
              bgcolor: on ? "#E7F2FF" : "white",
              color: on ? "primary.main" : "#8B9AB0",
              border: "1px solid",
              borderColor: on ? "#C5E0FF" : "#E3EAF3",
              px: "15px",
              py: "10px",
              borderRadius: "30px",
              fontSize: 11,
              fontWeight: 800,
              minWidth: 0,
              "&:hover": { bgcolor: on ? "#E7F2FF" : "#f7faff" },
            }}
          >
            {filter.label}
          </Button>
        );
      })}
    </Stack>
  );
}
