"use client";

import { AppBar, Chip, Stack, Toolbar, ToggleButton, ToggleButtonGroup } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setCurrency } from "@/lib/store/slices/preferencesSlice";
import type { Currency } from "@/lib/format/currency";
import { BRAND_COLORS } from "@/lib/theme/theme";
import { Logo } from "@/components/common/Logo";

export function Topbar() {
  const currency = useAppSelector((state) => state.preferences.currency);
  const dispatch = useAppDispatch();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: "background.paper", color: "text.primary", borderBottom: "1px solid", borderColor: "divider" }}
    >
      <Toolbar sx={{ justifyContent: "space-between", gap: 2 }}>
        <Stack sx={{ display: { xs: "flex", md: "none" } }}>
          <Logo size={28} textColor={BRAND_COLORS.midnightNavy} />
        </Stack>

        <Stack direction="row" spacing={2} sx={{ alignItems: "center", ml: "auto" }}>
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
          <Chip label="Sample workspace" size="small" sx={{ display: { xs: "none", sm: "flex" } }} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
