"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Box, Stack, Typography } from "@mui/material";

import { useAppSelector } from "@/lib/store/hooks";
import { formatCurrency } from "@/lib/format/currency";
import { circles, monthlySavingsCaption, monthlySavingsCents, overviewInsights } from "@/lib/domain/mock-data";
import { ActionButton } from "@/components/common/ActionButton";
import { HeroBanner } from "@/components/common/HeroBanner";
import { PageHeader } from "@/components/common/PageHeader";
import { Row } from "@/components/common/Row";
import { SectionHeader } from "@/components/common/SectionHeader";
import { SoftCard } from "@/components/common/SoftCard";
import { SpendingRhythmChart } from "@/components/common/SpendingRhythmChart";
import { StatCard } from "@/components/common/StatCard";

export default function OverviewPage() {
  const currency = useAppSelector((state) => state.preferences.currency);
  const router = useRouter();

  const owedToYouCents = circles
    .filter((c) => c.netBalanceCents > 0)
    .reduce((sum, c) => sum + c.netBalanceCents, 0);
  const youOweCents = circles
    .filter((c) => c.netBalanceCents < 0)
    .reduce((sum, c) => sum + Math.abs(c.netBalanceCents), 0);

  return (
    <Box>
      <PageHeader
        eyebrow="Your financial space"
        title="Good morning, Alex ✳"
        subtitle="A smarter way to manage money, together and on your own."
        action={
          <ActionButton component={Link} href="/add-expense">
            ＋ New expense
          </ActionButton>
        }
      />

      <HeroBanner />

      <Stack direction={{ xs: "column", sm: "row" }} spacing="18px">
        <StatCard
          label="Total owed to you"
          value={formatCurrency(owedToYouCents, currency)}
          caption="↗ +12.5% this month"
          captionColor="success.main"
        />
        <StatCard
          label="You owe others"
          value={formatCurrency(youOweCents, currency)}
          caption="Across 2 expenses"
          captionColor="error.main"
        />
        <StatCard
          label="Monthly savings"
          value={formatCurrency(monthlySavingsCents, currency)}
          caption={`↗ ${monthlySavingsCaption}`}
          captionColor="success.main"
        />
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing="18px" sx={{ mt: "19px" }}>
        <SoftCard sx={{ flex: 1 }}>
          <SectionHeader title="Your circles" actionLabel="View all" onAction={() => router.push("/circles")} />
          {circles.map((circle, i) => (
            <Box key={circle.id} component={Link} href={`/circles/${circle.id}`} sx={{ display: "block" }}>
              <Row
                icon={circle.icon}
                title={circle.name}
                subtitle={`${circle.groupType} · ${circle.memberIds.length} members`}
                trailing={
                  <Typography
                    sx={{ fontSize: 12, fontWeight: 700 }}
                    color={circle.netBalanceCents >= 0 ? "success.main" : "error.main"}
                  >
                    {formatCurrency(circle.netBalanceCents, currency)}
                  </Typography>
                }
                last={i === circles.length - 1}
              />
            </Box>
          ))}
        </SoftCard>

        <SoftCard sx={{ flex: 1 }}>
          <SectionHeader title="Spending rhythm" />
          <Typography sx={{ color: "text.secondary", fontSize: 12 }}>Your last seven months</Typography>
          <SpendingRhythmChart />
        </SoftCard>

        <SoftCard sx={{ flex: 1 }}>
          <SectionHeader title="Smart insights" />
          <Stack spacing="12px">
            {overviewInsights.map((insight) => (
              <Stack
                key={insight.title}
                direction="row"
                spacing="12px"
                sx={{ bgcolor: "#EBF5FF", border: "1px solid #DBEAFF", borderRadius: "15px", p: "16px" }}
              >
                <Box
                  sx={{
                    bgcolor: "white",
                    borderRadius: "10px",
                    width: 33,
                    height: 33,
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  ✦
                </Box>
                <Box>
                  <Typography sx={{ fontSize: 11, fontWeight: 700 }}>{insight.title}</Typography>
                  <Typography sx={{ fontSize: 10, color: "#7087A1", lineHeight: 1.8, mt: "5px" }}>
                    {insight.body}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </SoftCard>
      </Stack>
    </Box>
  );
}
