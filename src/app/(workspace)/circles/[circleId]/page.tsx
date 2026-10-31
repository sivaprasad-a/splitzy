"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";

import { useAppSelector } from "@/lib/store/hooks";
import { formatCurrency, formatSignedCurrency } from "@/lib/format/currency";
import { getCircle, getExpensesForCircle, getMember, memberBalancesByCircle } from "@/lib/domain/mock-data";
import { BRAND_COLORS } from "@/lib/theme/theme";

export default function CircleDetailPage({ params }: { params: Promise<{ circleId: string }> }) {
  const { circleId } = use(params);
  const currency = useAppSelector((state) => state.preferences.currency);

  const circle = getCircle(circleId);
  if (!circle) notFound();

  const circleExpenses = getExpensesForCircle(circleId);
  const memberBalances = memberBalancesByCircle[circleId] ?? [];

  return (
    <Stack spacing={4}>
      <Stack spacing={0.5}>
        <Typography variant="overline" color="text.secondary">
          Workspace / Circles / Detail
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {circle.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Shared overview, member balances, expense log and invite controls.
        </Typography>
      </Stack>

      <Paper sx={{ p: 4, borderRadius: 3, bgcolor: BRAND_COLORS.midnightNavy, color: "white" }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ justifyContent: "space-between", alignItems: { sm: "center" } }}
        >
          <Stack spacing={0.5}>
            <Typography variant="overline" sx={{ opacity: 0.7, textTransform: "uppercase" }}>
              {circle.groupType} · {circle.memberIds.length} members
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              {formatCurrency(Math.abs(circle.netBalanceCents), currency)}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {circle.netBalanceCents >= 0 ? "Total owed to you" : "Total you owe"}
            </Typography>
          </Stack>
          <Button
            component={Link}
            href={`/add-expense?circle=${circle.id}`}
            variant="contained"
            color="secondary"
            size="large"
          >
            + Add expense
          </Button>
        </Stack>
      </Paper>

      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, flex: 1.4 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Recent expenses
          </Typography>
          <Stack divider={<Box sx={{ borderBottom: "1px solid", borderColor: "divider" }} />} spacing={2}>
            {circleExpenses.map((expense) => {
              const payer = getMember(expense.payerId);
              return (
                <Stack key={expense.id} direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                  <Stack>
                    <Typography sx={{ fontWeight: 600 }}>{expense.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Paid by {payer?.name} · {expense.participantIds.length} participants
                    </Typography>
                  </Stack>
                  <Typography sx={{ fontWeight: 700 }}>{formatCurrency(expense.amountCents, currency)}</Typography>
                </Stack>
              );
            })}
            {circleExpenses.length === 0 && (
              <Typography color="text.secondary">No expenses recorded yet.</Typography>
            )}
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Member balances
          </Typography>
          <Stack spacing={2} sx={{ mb: 3 }}>
            {memberBalances.map((balance) => {
              const member = getMember(balance.memberId);
              return (
                <Stack key={balance.memberId} direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography>{member?.name}</Typography>
                  <Typography sx={{ fontWeight: 700 }} color={balance.amountCents >= 0 ? "success.main" : "error.main"}>
                    {formatSignedCurrency(balance.amountCents, currency)}
                  </Typography>
                </Stack>
              );
            })}
            {memberBalances.length === 0 && (
              <Typography color="text.secondary">Balances are all settled.</Typography>
            )}
          </Stack>
          <Button variant="contained" fullWidth>
            Share statement
          </Button>
        </Paper>
      </Stack>
    </Stack>
  );
}
