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
      <svg
        viewBox="0 0 128 128"
        width={size}
        height={size}
        role="img"
        aria-label="Splitzy"
        style={{ color: textColor, flexShrink: 0 }}
      >
        <path
          fill="currentColor"
          opacity={0.55}
          d="M16 44C16 22 35 12 62 12H112C108 28 92 40 72 51L38 72C22 68 16 58 16 44Z"
        />
        <path fill="currentColor" d="M112 84C112 106 93 116 66 116H16C20 100 36 88 56 77L90 56C106 60 112 70 112 84Z" />
      </svg>
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
