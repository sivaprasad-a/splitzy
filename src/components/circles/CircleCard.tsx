import Link from "next/link";
import { Box, Stack, Typography } from "@mui/material";

import { formatSignedCurrency, type Currency } from "@/lib/format/currency";
import { BRAND_COLORS, CARD_SHADOW } from "@/lib/theme/theme";
import { getMember } from "@/lib/domain/mock-data";
import type { Circle } from "@/lib/domain/types";

export function CircleCard({ circle, currency }: { circle: Circle; currency: Currency }) {
  const initials = circle.memberIds.slice(0, 3).map((id) => getMember(id)?.initials ?? "?");

  return (
    <Box
      component={Link}
      href={`/circles/${circle.id}`}
      sx={{
        display: "block",
        bgcolor: "white",
        border: "1px solid",
        borderColor: BRAND_COLORS.cardBorder,
        borderRadius: "21px",
        boxShadow: CARD_SHADOW,
        p: "23px",
        minHeight: 210,
        flex: "1 1 260px",
        transition: "transform .2s",
        "&:hover": { transform: "translateY(-5px)" },
      }}
    >
      <Box
        sx={{
          width: 55,
          height: 55,
          borderRadius: "13px",
          bgcolor: "#E9F4FF",
          display: "grid",
          placeItems: "center",
          fontSize: 24,
        }}
      >
        {circle.icon}
      </Box>
      <Typography sx={{ fontSize: 15, fontWeight: 800, mt: "18px", mb: "6px" }}>
        {circle.name}
      </Typography>
      <Typography sx={{ color: "text.secondary", fontSize: 12, textTransform: "capitalize" }}>
        {circle.groupType} circle · {circle.memberIds.length} members
      </Typography>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          borderTop: "1px solid #E9EEF6",
          mt: "24px",
          pt: "16px",
          fontSize: 11,
        }}
      >
        <Typography sx={{ fontSize: 11, color: "text.secondary" }}>{initials.join(" · ")}</Typography>
        <Typography sx={{ fontSize: 11, fontWeight: 800 }} color={circle.netBalanceCents >= 0 ? "success.main" : "error.main"}>
          {formatSignedCurrency(circle.netBalanceCents, currency)}
        </Typography>
      </Stack>
    </Box>
  );
}
