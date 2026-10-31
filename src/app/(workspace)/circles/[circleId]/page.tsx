"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { useAppSelector } from "@/lib/store/hooks";
import { formatCurrency, formatSignedCurrency } from "@/lib/format/currency";
import { getCircle, getExpensesForCircle, getMember, memberBalancesByCircle } from "@/lib/domain/mock-data";
import { BRAND_COLORS } from "@/lib/theme/theme";
import { ActionButton } from "@/components/common/ActionButton";
import { PageHeader } from "@/components/common/PageHeader";
import { Row } from "@/components/common/Row";
import { SectionHeader } from "@/components/common/SectionHeader";
import { SoftCard } from "@/components/common/SoftCard";

export default function CircleDetailPage({ params }: { params: Promise<{ circleId: string }> }) {
  const { circleId } = use(params);
  const currency = useAppSelector((state) => state.preferences.currency);

  const circle = getCircle(circleId);
  if (!circle) notFound();

  const circleExpenses = getExpensesForCircle(circleId);
  const memberBalances = memberBalancesByCircle[circleId] ?? [];

  return (
    <Box>
      <PageHeader
        eyebrow={circle.groupType}
        title={circle.name}
        subtitle="Shared overview, member balances and the expense log for this circle."
        action={
          <ActionButton component={Link} href={`/add-expense?circle=${circle.id}`}>
            ＋ Add expense
          </ActionButton>
        }
      />

      <Box
        sx={{
          borderRadius: "24px",
          p: { xs: "24px", md: "29px 34px" },
          mb: "20px",
          color: "white",
          bgcolor: BRAND_COLORS.midnightNavy,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { sm: "center" },
          gap: 2,
        }}
      >
        <Box>
          <Typography sx={{ color: "#75DEFF", fontSize: 10, fontWeight: 800, letterSpacing: "1.8px", textTransform: "uppercase" }}>
            {circle.groupType} · {circle.memberIds.length} members
          </Typography>
          <Typography sx={{ fontSize: 32, fontWeight: 800, letterSpacing: "-1.3px", my: "7px" }}>
            {formatCurrency(Math.abs(circle.netBalanceCents), currency)}
          </Typography>
          <Typography sx={{ color: "#B7CBE8", fontSize: 12 }}>
            {circle.netBalanceCents >= 0 ? "Total owed to you" : "Total you owe"}
          </Typography>
        </Box>
      </Box>

      <Stack direction={{ xs: "column", md: "row" }} spacing="18px">
        <SoftCard sx={{ flex: 1.4 }}>
          <SectionHeader title="Recent expenses" />
          {circleExpenses.map((expense, i) => {
            const payer = getMember(expense.payerId);
            return (
              <Row
                key={expense.id}
                icon="💳"
                title={expense.title}
                subtitle={`Paid by ${payer?.name} · ${expense.participantIds.length} participants`}
                last={i === circleExpenses.length - 1}
                trailing={
                  <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
                    {formatCurrency(expense.amountCents, currency)}
                  </Typography>
                }
              />
            );
          })}
          {circleExpenses.length === 0 && (
            <Typography color="text.secondary" sx={{ py: 2 }}>
              No expenses recorded yet.
            </Typography>
          )}
        </SoftCard>

        <SoftCard sx={{ flex: 1 }}>
          <SectionHeader title="Member balances" />
          <Stack spacing="13px" sx={{ mb: "20px" }}>
            {memberBalances.map((balance) => {
              const member = getMember(balance.memberId);
              return (
                <Stack
                  key={balance.memberId}
                  direction="row"
                  sx={{ justifyContent: "space-between", gap: "12px", fontSize: 11, pb: "13px", borderBottom: "1px solid", borderColor: "divider" }}
                >
                  <Typography sx={{ fontSize: 12 }}>{member?.name}</Typography>
                  <Typography
                    sx={{ fontSize: 12, fontWeight: 700 }}
                    color={balance.amountCents >= 0 ? "success.main" : "error.main"}
                  >
                    {formatSignedCurrency(balance.amountCents, currency)}
                  </Typography>
                </Stack>
              );
            })}
            {memberBalances.length === 0 && <Typography color="text.secondary">Balances are all settled.</Typography>}
          </Stack>
          <ActionButton variant="soft" fullWidth>
            Share statement
          </ActionButton>
        </SoftCard>
      </Stack>
    </Box>
  );
}
