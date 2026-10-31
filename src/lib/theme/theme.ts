import { alpha, createTheme } from "@mui/material/styles";

// Official tokens from docs/Splitzy_Brand_Kit/Splitzy_Brand_Product_Workflow.pdf
// ("01 / Brand foundation"), extended with the exact values from the
// approved reference mock (splitzy-studio-2026.shivaprasadaluri.chatgpt.site).
// Keep this file the single source of truth — never hardcode a hex color
// elsewhere; import from here instead.
export const BRAND_COLORS = {
  midnightNavy: "#07152F",
  trustNavy: "#071D49",
  splitzyBlue: "#1677FF",
  electricCyan: "#37C8F5",
  iceWhite: "#F7FAFF",
  white: "#FFFFFF",
  // From the reference mock's CSS
  mutedText: "#8A99AF",
  sidebarInactiveText: "#94A8C8",
  sidebarActiveBg: "#19365D",
  cardBorder: "#E8EEF7",
  positive: "#12AC82",
  negative: "#EE7180",
} as const;

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: BRAND_COLORS.splitzyBlue, contrastText: BRAND_COLORS.white },
    secondary: { main: BRAND_COLORS.electricCyan },
    background: { default: BRAND_COLORS.iceWhite, paper: BRAND_COLORS.white },
    text: { primary: BRAND_COLORS.midnightNavy, secondary: BRAND_COLORS.mutedText },
    success: { main: BRAND_COLORS.positive },
    error: { main: BRAND_COLORS.negative },
    divider: BRAND_COLORS.cardBorder,
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: "var(--font-manrope), system-ui, sans-serif",
  },
});

// Light tint of Splitzy blue for avatar/badge backgrounds.
export const BRAND_TINT = alpha(BRAND_COLORS.splitzyBlue, 0.1);

// Card shadow matching the reference's very soft elevation.
export const CARD_SHADOW = "0 16px 43px rgba(17,45,83,0.035)";
