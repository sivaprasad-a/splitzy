"use client";

import { useMemo, useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";

import { useAppSelector } from "@/lib/store/hooks";
import { formatCurrency } from "@/lib/format/currency";
import { circles, expenses, getCircle, getMember } from "@/lib/domain/mock-data";
import type { CircleGroupType } from "@/lib/domain/types";
import { CircleCard } from "@/components/circles/CircleCard";
import { CircleFilterChips } from "@/components/circles/CircleFilterChips";

export default function CirclesPage() {
  const currency = useAppSelector((state) => state.preferences.currency);
  const [filter, setFilter] = useState<CircleGroupType | "all">("all");

  const filteredCircles = useMemo(
    () => circles.filter((c) => filter === "all" || c.groupType === filter),
    [filter],
  );

  const recentActivity = [...expenses].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <Stack spacing={4}>
      <Stack spacing={0.5}>
        <Typography variant="overline" color="text.secondary">
          Workspace / Circles
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Split circles
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Every group, one shared view of expenses and balances.
        </Typography>
      </Stack>

      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 2 }}>
        {filteredCircles.map((circle) => (
          <CircleCard key={circle.id} circle={circle} currency={currency} />
        ))}
      </Stack>

      <CircleFilterChips value={filter} onChange={setFilter} />

      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Circle activity
        </Typography>
        <Stack divider={<Box sx={{ borderBottom: "1px solid", borderColor: "divider" }} />} spacing={2}>
          {recentActivity.map((expense) => {
            const circle = getCircle(expense.circleId);
            const payer = getMember(expense.payerId);
            return (
              <Stack key={expense.id} direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                <Stack>
                  <Typography sx={{ fontWeight: 600 }}>{expense.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {circle?.name} · paid by {payer?.name}
                  </Typography>
                </Stack>
                <Typography sx={{ fontWeight: 700 }} color="text.secondary">
                  {formatCurrency(expense.amountCents, currency)}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Paper>
    </Stack>
  );
}
