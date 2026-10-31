import { Box, Typography } from "@mui/material";

import { BRAND_COLORS, CARD_SHADOW } from "@/lib/theme/theme";

interface StatCardProps {
  label: string;
  value: string;
  caption?: string;
  captionColor?: "success.main" | "error.main" | "text.secondary";
}

export function StatCard({ label, value, caption, captionColor = "text.secondary" }: StatCardProps) {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: "white",
        border: "1px solid",
        borderColor: BRAND_COLORS.cardBorder,
        borderRadius: "21px",
        boxShadow: CARD_SHADOW,
        p: "23px",
        minHeight: 152,
        flex: 1,
        minWidth: 220,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: 110,
          height: 110,
          right: -50,
          top: -50,
          bgcolor: "#EEF7FF",
          borderRadius: "50%",
        }}
      />
      <Typography sx={{ color: "#8594A9", fontWeight: 700, fontSize: 12, position: "relative" }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: 28, letterSpacing: "-1px", fontWeight: 800, my: "14px", position: "relative" }}>
        {value}
      </Typography>
      {caption && (
        <Typography sx={{ color: captionColor, fontSize: 11, fontWeight: 700, position: "relative" }}>
          {caption}
        </Typography>
      )}
    </Box>
  );
}
