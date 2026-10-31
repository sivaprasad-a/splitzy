"use client";

import { usePathname } from "next/navigation";
import { Avatar, Box, MenuItem, Select, Stack, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setCurrency } from "@/lib/store/slices/preferencesSlice";
import type { Currency } from "@/lib/format/currency";
import { BRAND_COLORS } from "@/lib/theme/theme";
import { Logo } from "@/components/common/Logo";
import { navItems } from "./navItems";

function activePageLabel(pathname: string): string {
  if (pathname.startsWith("/circles")) return "Circles";
  const match = navItems.find((item) => item.href && (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)));
  return match?.label ?? "Overview";
}

export function Topbar() {
  const pathname = usePathname();
  const currency = useAppSelector((state) => state.preferences.currency);
  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        px: { xs: 2, md: "38px" },
        pt: { xs: 2, md: "27px" },
        pb: { xs: 2, md: "32px" },
        color: BRAND_COLORS.mutedText,
        fontSize: 11,
      }}
    >
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <Logo size={28} textColor={BRAND_COLORS.midnightNavy} />
      </Box>

      <Typography sx={{ display: { xs: "none", md: "block" }, fontSize: 11, color: BRAND_COLORS.mutedText }}>
        Workspace / <Box component="b" sx={{ color: "#244466" }}>{activePageLabel(pathname)}</Box>
      </Typography>

      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", ml: "auto" }}>
        <Typography sx={{ display: { xs: "none", sm: "block" }, fontSize: 11, color: BRAND_COLORS.mutedText }}>
          ● Sample workspace
        </Typography>
        <Select
          size="small"
          value={currency}
          onChange={(e) => dispatch(setCurrency(e.target.value as Currency))}
          inputProps={{ "aria-label": "Display currency" }}
          sx={{
            bgcolor: "white",
            borderRadius: "24px",
            fontSize: 12,
            color: "#2e4d73",
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e1eaf5" },
            "& .MuiSelect-select": { py: "9px", px: "12px" },
          }}
        >
          <MenuItem value="USD">USD $</MenuItem>
          <MenuItem value="INR">INR ₹</MenuItem>
        </Select>
        <Avatar sx={{ width: 36, height: 36, bgcolor: "#D9EAFF", color: "#1561B9", fontWeight: 800, fontSize: 13 }}>
          AL
        </Avatar>
      </Stack>
    </Box>
  );
}
