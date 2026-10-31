import { Box } from "@mui/material";

import { Sidebar, SIDEBAR_WIDTH } from "./Sidebar";
import { Topbar } from "./Topbar";
import { BottomNav } from "./BottomNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: "100dvh" }}>
      <Sidebar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          minHeight: "100dvh",
          ml: { xs: 0, md: `${SIDEBAR_WIDTH}px` },
        }}
      >
        <Topbar />
        <Box
          component="main"
          sx={{
            flex: 1,
            px: { xs: 2, md: 4 },
            py: { xs: 2, md: 4 },
            // Clear the fixed mobile bottom nav (56px bar + safe area).
            pb: { xs: "calc(72px + env(safe-area-inset-bottom))", md: 4 },
          }}
        >
          {children}
        </Box>
      </Box>
      <BottomNav />
    </Box>
  );
}
