import { alpha, createTheme } from "@mui/material/styles";

// Official tokens from docs/Splitzy_Brand_Kit/Splitzy_Brand_Product_Workflow.pdf
// ("01 / Brand foundation"). Keep this file the single source of truth —
// never hardcode a hex color elsewhere; import from here instead.
export const BRAND_COLORS = {
  midnightNavy: "#07152F",
  trustNavy: "#071D49",
  splitzyBlue: "#1677FF",
  electricCyan: "#37C8F5",
  iceWhite: "#F7FAFF",
  white: "#FFFFFF",
} as const;

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: BRAND_COLORS.splitzyBlue, contrastText: BRAND_COLORS.white },
    secondary: { main: BRAND_COLORS.electricCyan },
    background: { default: BRAND_COLORS.iceWhite, paper: BRAND_COLORS.white },
    text: { primary: BRAND_COLORS.midnightNavy },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "var(--font-inter), system-ui, sans-serif",
    h1: { fontFamily: "var(--font-manrope), system-ui, sans-serif" },
    h2: { fontFamily: "var(--font-manrope), system-ui, sans-serif" },
    h3: { fontFamily: "var(--font-manrope), system-ui, sans-serif" },
    h4: { fontFamily: "var(--font-manrope), system-ui, sans-serif" },
    h5: { fontFamily: "var(--font-manrope), system-ui, sans-serif" },
    h6: { fontFamily: "var(--font-manrope), system-ui, sans-serif" },
  },
});

// Light tint of Splitzy blue for avatar/badge backgrounds, matching the
// screenbook's light-blue avatar chips.
export const BRAND_TINT = alpha(BRAND_COLORS.splitzyBlue, 0.1);
