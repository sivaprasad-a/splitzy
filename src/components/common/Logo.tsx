import { Stack, Typography } from "@mui/material";

export function Logo({
  size = 32,
  textColor = "white",
  showText = true,
}: {
  size?: number;
  textColor?: string;
  showText?: boolean;
}) {
  return (
    <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static brand SVG, no optimization needed */}
      <img src="/brand/splitzy-symbol.svg" alt="Splitzy" width={size} height={size} />
      {showText && (
        <Typography
          variant="h6"
          sx={{ fontFamily: "var(--font-manrope)", fontWeight: 800, color: textColor, lineHeight: 1 }}
        >
          Splitzy
        </Typography>
      )}
    </Stack>
  );
}
