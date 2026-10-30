"use client";

import { useState } from "react";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { SessionProvider } from "next-auth/react";

import { makeStore } from "@/lib/store/store";
import { theme } from "@/lib/theme/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  const [store] = useState(makeStore);

  return (
    <SessionProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}
