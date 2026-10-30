"use client";

import { AppBar, Chip, Stack, Toolbar, ToggleButton, ToggleButtonGroup } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setCurrency } from "@/lib/store/slices/preferencesSlice";
import type { Currency } from "@/lib/format/currency";

export function Topbar() {
  const currency = useAppSelector((state) => state.preferences.currency);
  const dispatch = useAppDispatch();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: "background.paper", color: "text.primary", borderBottom: "1px solid", borderColor: "divider" }}
    >
      <Toolbar sx={{ justifyContent: "flex-end", gap: 2 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <ToggleButtonGroup
            size="small"
            value={currency}
            exclusive
            onChange={(_, value: Currency | null) => value && dispatch(setCurrency(value))}
            aria-label="Currency"
          >
            <ToggleButton value="USD">USD</ToggleButton>
            <ToggleButton value="INR">INR</ToggleButton>
          </ToggleButtonGroup>
          <Chip label="Sample workspace" size="small" />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
