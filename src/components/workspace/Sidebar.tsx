"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography } from "@mui/material";

import { alpha } from "@mui/material/styles";

import { BRAND_COLORS } from "@/lib/theme/theme";
import { Logo } from "@/components/common/Logo";
import { navItems } from "./navItems";

export const SIDEBAR_WIDTH = 240;
const SELECTED_BG = alpha(BRAND_COLORS.electricCyan, 0.18);

export function Sidebar() {
  const pathname = usePathname();

  return (
    <Box
      component="nav"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        position: "fixed",
        insetBlock: 0,
        left: 0,
        bgcolor: BRAND_COLORS.midnightNavy,
        color: "white",
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        px: 2,
        py: 3,
        gap: 3,
        overflowY: "auto",
      }}
    >
      <Box sx={{ pl: 1 }}>
        <Logo />
      </Box>

      <Box>
        <Typography variant="overline" sx={{ opacity: 0.6, pl: 1 }}>
          Workspace
        </Typography>
        <List dense disablePadding sx={{ mt: 1 }}>
          {navItems.map((item) => {
            const disabled = !item.href;
            const active = item.href === "/" ? pathname === "/" : !!item.href && pathname.startsWith(item.href);

            const button = (
              <ListItemButton
                key={item.label}
                {...(disabled ? {} : { component: Link, href: item.href })}
                disabled={disabled}
                selected={active}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  color: "white",
                  "&.Mui-selected": { bgcolor: SELECTED_BG },
                  "&.Mui-disabled": { color: "rgba(255,255,255,0.4)" },
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            );

            return item.comingIn ? (
              <Tooltip key={item.label} title={`Coming in ${item.comingIn}`} placement="right">
                <span>{button}</span>
              </Tooltip>
            ) : (
              button
            );
          })}
        </List>
      </Box>
    </Box>
  );
}
