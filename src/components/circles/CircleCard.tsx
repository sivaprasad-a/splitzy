import Link from "next/link";
import { Avatar, Paper, Stack, Typography } from "@mui/material";

import { formatSignedCurrency, type Currency } from "@/lib/format/currency";
import type { Circle } from "@/lib/domain/types";

export function CircleCard({ circle, currency }: { circle: Circle; currency: Currency }) {
  return (
    <Paper
      component={Link}
      href={`/circles/${circle.id}`}
      variant="outlined"
      sx={{ p: 3, borderRadius: 3, display: "block", textDecoration: "none", color: "inherit", flex: "1 1 260px" }}
    >
      <Stack spacing={2}>
        <Avatar sx={{ bgcolor: "#e4edfb", color: "primary.main", fontWeight: 700 }}>
          {circle.name.charAt(0)}
        </Avatar>
        <Stack spacing={0.25}>
          <Typography sx={{ fontWeight: 700 }}>{circle.name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textTransform: "capitalize" }}>
            {circle.groupType} · {circle.memberIds.length} members
          </Typography>
        </Stack>
        <Typography sx={{ fontWeight: 700 }} color={circle.netBalanceCents >= 0 ? "success.main" : "error.main"}>
          {formatSignedCurrency(circle.netBalanceCents, currency)}
        </Typography>
      </Stack>
    </Paper>
  );
}
