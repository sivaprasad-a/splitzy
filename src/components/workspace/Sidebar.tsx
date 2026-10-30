"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography } from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";

interface NavItem {
  label: string;
  href?: string;
  icon: React.ReactNode;
  comingIn?: string;
}

const navItems: NavItem[] = [
  { label: "Overview", href: "/", icon: <DashboardOutlinedIcon fontSize="small" /> },
  { label: "Circles", href: "/circles", icon: <GroupsOutlinedIcon fontSize="small" /> },
  { label: "Add expense", href: "/add-expense", icon: <AddCircleOutlinedIcon fontSize="small" /> },
  { label: "Personal", icon: <PersonOutlinedIcon fontSize="small" />, comingIn: "Phase 3" },
  { label: "Savings", icon: <SavingsOutlinedIcon fontSize="small" />, comingIn: "Phase 3" },
  { label: "Reports", icon: <DescriptionOutlinedIcon fontSize="small" />, comingIn: "Phase 4" },
  { label: "Settlements", href: "/settlements", icon: <SwapHorizOutlinedIcon fontSize="small" /> },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <Box
      component="nav"
      sx={{
        width: 240,
        flexShrink: 0,
        bgcolor: "#0b1a3a",
        color: "white",
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        px: 2,
        py: 3,
        gap: 3,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Splitzy
      </Typography>

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
                  "&.Mui-selected": { bgcolor: "rgba(56,189,248,0.18)" },
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
