"use client";

import { Box } from "@mui/material";

import { useAppSelector } from "@/lib/store/hooks";
import { Sidebar, SIDEBAR_WIDTH_COLLAPSED, SIDEBAR_WIDTH_EXPANDED } from "./Sidebar";
import { Topbar } from "./Topbar";
import { BottomNav } from "./BottomNav";
import { SplitzyIQLauncher } from "./SplitzyIQLauncher";

export function AppShell({ children }: { children: React.ReactNode }) {
  const collapsed = useAppSelector((state) => state.preferences.sidebarCollapsed);
  const sidebarWidth = collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED;

  return (
    <Box sx={{ minHeight: "100dvh", bgcolor: "background.default" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          minWidth: 0,
          minHeight: "100dvh",
          ml: { xs: 0, md: `${sidebarWidth}px` },
          transition: (theme) => theme.transitions.create("margin-left", { duration: 200 }),
        }}
      >
        <Topbar />
        <Box
          sx={{
            px: { xs: 2, md: "38px" },
            // Clear the fixed mobile bottom nav (56px bar + safe area).
            pb: { xs: "calc(72px + env(safe-area-inset-bottom))", md: "38px" },
          }}
        >
          {children}
        </Box>
      </Box>
      <BottomNav />
      <SplitzyIQLauncher />
    </Box>
  );
}
