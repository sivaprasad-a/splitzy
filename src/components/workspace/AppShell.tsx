import { Box } from "@mui/material";

import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100dvh" }}>
      <Sidebar />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Topbar />
        <Box component="main" sx={{ flex: 1, px: { xs: 2, md: 4 }, py: 4 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
