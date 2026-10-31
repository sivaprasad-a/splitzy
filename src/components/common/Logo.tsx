import { Stack, Typography } from "@mui/material";

export function Logo({ size = 32, textColor = "white" }: { size?: number; textColor?: string }) {
  return (
    <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static brand SVG, no optimization needed */}
      <img src="/brand/splitzy-symbol.svg" alt="" width={size} height={size} />
      <Typography
        variant="h6"
        sx={{ fontFamily: "var(--font-manrope)", fontWeight: 800, color: textColor, lineHeight: 1 }}
      >
        Splitzy
      </Typography>
    </Stack>
  );
}
