import { Box, type BoxProps } from "@mui/material";

import { BRAND_COLORS, CARD_SHADOW } from "@/lib/theme/theme";

export function SoftCard({ sx, ...props }: BoxProps) {
  return (
    <Box
      sx={[
        {
          bgcolor: "white",
          border: "1px solid",
          borderColor: BRAND_COLORS.cardBorder,
          borderRadius: "21px",
          boxShadow: CARD_SHADOW,
          p: "23px",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    />
  );
}
