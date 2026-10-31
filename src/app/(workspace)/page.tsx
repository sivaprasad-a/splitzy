"use client";

import Link from "next/link";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";

import { useAppSelector } from "@/lib/store/hooks";
import { formatCurrency, formatSignedCurrency } from "@/lib/format/currency";
import { circles } from "@/lib/domain/mock-data";
import { BRAND_TINT } from "@/lib/theme/theme";
import { StatCard } from "@/components/common/StatCard";

export default function OverviewPage() {
  const currency = useAppSelector((state) => state.preferences.currency);

  const owedToYouCents = circles
    .filter((c) => c.netBalanceCents > 0)
    .reduce((sum, c) => sum + c.netBalanceCents, 0);
  const youOweCents = circles
    .filter((c) => c.netBalanceCents < 0)
    .reduce((sum, c) => sum + Math.abs(c.netBalanceCents), 0);

  return (
    <Stack spacing={4}>
      <Stack spacing={0.5}>
        <Typography variant="overline" color="text.secondary">
          Workspace / Overview
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Your money, beautifully in sync.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Dashboard with clear balances and rapid actions.
        </Typography>
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <StatCard
          label="Owed to you"
          value={formatCurrency(owedToYouCents, currency)}
          caption="Across your circles"
          captionColor="success.main"
        />
        <StatCard
          label="You owe"
          value={formatCurrency(youOweCents, currency)}
          caption="Settle up when ready"
          captionColor="error.main"
        />
        <StatCard label="Open circles" value={String(circles.length)} caption="Active this month" />
      </Stack>

      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Your circles
        </Typography>
        <Stack divider={<Box sx={{ borderBottom: "1px solid", borderColor: "divider" }} />} spacing={2}>
          {circles.map((circle) => (
            <Stack
              key={circle.id}
              component={Link}
              href={`/circles/${circle.id}`}
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "center", textDecoration: "none", color: "inherit" }}
            >
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                <Avatar sx={{ bgcolor: BRAND_TINT, color: "primary.main", fontWeight: 700, width: 36, height: 36 }}>
                  {circle.name.charAt(0)}
                </Avatar>
                <Stack>
                  <Typography sx={{ fontWeight: 600 }}>{circle.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {circle.groupType} · {circle.memberIds.length} members
                  </Typography>
                </Stack>
              </Stack>
              <Typography
                sx={{ fontWeight: 700 }}
                color={circle.netBalanceCents >= 0 ? "success.main" : "error.main"}
              >
                {formatSignedCurrency(circle.netBalanceCents, currency)}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
}
