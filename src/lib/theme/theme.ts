import { createTheme } from "@mui/material/styles";

// Tokens mirror the deck's premium blue palette (deep navy surfaces, sky
// blue accents). Keep this file the single source of color/typography truth.
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1a56b0", contrastText: "#ffffff" },
    secondary: { main: "#38bdf8" },
    background: { default: "#f4f7fb", paper: "#ffffff" },
    text: { primary: "#0b1a3a" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  },
});
