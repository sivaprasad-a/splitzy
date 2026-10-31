"use client";

import { usePathname, useRouter } from "next/navigation";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";

import { bottomNavItems } from "./navItems";

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const activeIndex = bottomNavItems.findIndex((item) =>
    item.href === "/" ? pathname === "/" : !!item.href && pathname.startsWith(item.href),
  );

  return (
    <Paper
      elevation={3}
      sx={{
        display: { xs: "block", md: "none" },
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.appBar,
        // Respect the home-indicator safe area on iOS PWAs.
        pb: "env(safe-area-inset-bottom)",
      }}
    >
      <BottomNavigation
        showLabels
        value={activeIndex === -1 ? false : activeIndex}
        onChange={(_, newValue: number) => {
          const href = bottomNavItems[newValue]?.href;
          if (href) router.push(href);
        }}
      >
        {bottomNavItems.map((item) => (
          <BottomNavigationAction key={item.label} label={item.label} icon={item.icon} />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
