"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { toggleSidebarCollapsed } from "@/lib/store/slices/preferencesSlice";
import { BRAND_COLORS } from "@/lib/theme/theme";
import { Logo } from "@/components/common/Logo";
import { navItems } from "./navItems";

export const SIDEBAR_WIDTH_EXPANDED = 240;
export const SIDEBAR_WIDTH_COLLAPSED = 76;
const SELECTED_BG = alpha(BRAND_COLORS.electricCyan, 0.18);

export function Sidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector((state) => state.preferences.sidebarCollapsed);
  const width = collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED;

  return (
    <Box
      component="nav"
      sx={{
        width,
        flexShrink: 0,
        position: "fixed",
        insetBlock: 0,
        left: 0,
        bgcolor: BRAND_COLORS.midnightNavy,
        color: "white",
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        px: collapsed ? 1 : 2,
        py: 3,
        gap: 3,
        overflowY: "auto",
        overflowX: "hidden",
        transition: (theme) => theme.transitions.create("width", { duration: 200 }),
      }}
    >
      <Box
        sx={{
          pl: collapsed ? 0 : 1,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
        }}
      >
        <Logo showText={!collapsed} />
        {!collapsed && (
          <IconButton
            size="small"
            onClick={() => dispatch(toggleSidebarCollapsed())}
            aria-label="Collapse sidebar"
            sx={{ color: "white" }}
          >
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {collapsed && (
        <IconButton
          size="small"
          onClick={() => dispatch(toggleSidebarCollapsed())}
          aria-label="Expand sidebar"
          sx={{ color: "white", alignSelf: "center" }}
        >
          <ChevronRightIcon fontSize="small" />
        </IconButton>
      )}

      <Box>
        {!collapsed && (
          <Typography variant="overline" sx={{ opacity: 0.6, pl: 1 }}>
            Workspace
          </Typography>
        )}
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
                  justifyContent: collapsed ? "center" : "flex-start",
                  "&.Mui-selected": { bgcolor: SELECTED_BG },
                  "&.Mui-disabled": { color: "rgba(255,255,255,0.4)" },
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: collapsed ? 0 : 36, justifyContent: "center" }}>
                  {item.icon}
                </ListItemIcon>
                {!collapsed && <ListItemText primary={item.label} />}
              </ListItemButton>
            );

            const tooltipLabel = item.comingIn ? `${item.label} — coming in ${item.comingIn}` : item.label;

            return collapsed || item.comingIn ? (
              <Tooltip key={item.label} title={tooltipLabel} placement="right">
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
