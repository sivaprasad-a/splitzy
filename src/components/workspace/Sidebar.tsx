"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { toggleSidebarCollapsed } from "@/lib/store/slices/preferencesSlice";
import { BRAND_COLORS } from "@/lib/theme/theme";
import { Logo } from "@/components/common/Logo";
import { navItems } from "./navItems";

export const SIDEBAR_WIDTH_EXPANDED = 238;
export const SIDEBAR_WIDTH_COLLAPSED = 76;

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
        gap: "40px",
        px: collapsed ? "12px" : "19px",
        py: "28px",
        overflowY: "auto",
        overflowX: "hidden",
        transition: (theme) => theme.transitions.create("width", { duration: 200 }),
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "space-between" }}>
        <Logo showText={!collapsed} size={28} />
        {!collapsed && (
          <IconButton
            size="small"
            onClick={() => dispatch(toggleSidebarCollapsed())}
            aria-label="Collapse sidebar"
            sx={{ color: BRAND_COLORS.sidebarInactiveText }}
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
          sx={{ color: BRAND_COLORS.sidebarInactiveText, alignSelf: "center", mt: "-24px" }}
        >
          <ChevronRightIcon fontSize="small" />
        </IconButton>
      )}

      <List dense disablePadding sx={{ display: "flex", flexDirection: "column", gap: "7px" }}>
        {navItems.map((item) => {
          const disabled = !item.href;
          const active = item.href === "/" ? pathname === "/" : !!item.href && pathname.startsWith(item.href);

          const button = (
            <ListItemButton
              key={item.label}
              {...(disabled ? {} : { component: Link, href: item.href })}
              disabled={disabled}
              selected={active}
              disableTouchRipple
              sx={{
                borderRadius: "13px",
                p: "14px",
                gap: "14px",
                color: BRAND_COLORS.sidebarInactiveText,
                justifyContent: collapsed ? "center" : "flex-start",
                transition: (theme) => theme.transitions.create(["background-color", "color"], { duration: 150 }),
                "&:hover": { bgcolor: BRAND_COLORS.sidebarActiveBg, color: "white" },
                "&.Mui-selected": {
                  bgcolor: BRAND_COLORS.sidebarActiveBg,
                  color: "white",
                  boxShadow: `inset 3px 0 ${BRAND_COLORS.electricCyan}`,
                  "&:hover": { bgcolor: BRAND_COLORS.sidebarActiveBg },
                },
                "&.Mui-disabled": { color: "rgba(255,255,255,0.28)", opacity: 1 },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 0, width: 23, justifyContent: "center" }}>
                {item.icon}
              </ListItemIcon>
              {!collapsed && (
                <ListItemText
                  primary={item.label}
                  slotProps={{ primary: { sx: { fontSize: 12, fontWeight: 800 } } }}
                />
              )}
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

      {!collapsed && (
        <Box
          sx={{
            mt: "auto",
            background: "linear-gradient(145deg, #1D447A, #0B2446)",
            border: "1px solid #294871",
            borderRadius: "19px",
            p: "20px",
          }}
        >
          <AutoAwesomeIcon sx={{ color: BRAND_COLORS.electricCyan, fontSize: 20, mb: 1 }} />
          <Typography sx={{ fontWeight: 800, fontSize: 14, color: "white" }}>Meet Splitzy IQ</Typography>
          <Typography sx={{ fontSize: 11, color: "#B6C7DF", lineHeight: 1.8, mt: 0.5 }}>
            Helpful insights and more confident money decisions.
          </Typography>
          <Tooltip title="Splitzy IQ is planned for a later phase" placement="top">
            <span>
              <Button
                fullWidth
                size="small"
                disabled
                sx={{
                  mt: "14px",
                  bgcolor: "#DEF3FF",
                  color: "#13447E",
                  fontSize: 11,
                  fontWeight: 800,
                  borderRadius: "9px",
                  py: "10px",
                  "&.Mui-disabled": { bgcolor: "#DEF3FF", color: "#13447E", opacity: 0.7 },
                }}
              >
                Explore insights →
              </Button>
            </span>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
}
