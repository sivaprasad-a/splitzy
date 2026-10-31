"use client";

import { useMemo, useState } from "react";
import { Stack, Tooltip } from "@mui/material";

import { useAppSelector } from "@/lib/store/hooks";
import { formatCurrency } from "@/lib/format/currency";
import { circles, expenses, getCircle, getMember } from "@/lib/domain/mock-data";
import type { CircleGroupType } from "@/lib/domain/types";
import { ActionButton } from "@/components/common/ActionButton";
import { PageHeader } from "@/components/common/PageHeader";
import { Row } from "@/components/common/Row";
import { SectionHeader } from "@/components/common/SectionHeader";
import { SoftCard } from "@/components/common/SoftCard";
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
    <div>
      <PageHeader
        eyebrow="Share more, worry less"
        title="Your circles"
        subtitle="Friends, roommates and teams — everyone stays in the loop."
        action={
          <Tooltip title="Creating circles from the UI is planned for a later pass">
            <span>
              <ActionButton disabled>＋ Create circle</ActionButton>
            </span>
          </Tooltip>
        }
      />

      <CircleFilterChips value={filter} onChange={setFilter} />

      <Stack direction="row" sx={{ flexWrap: "wrap", gap: "18px" }}>
        {filteredCircles.map((circle) => (
          <CircleCard key={circle.id} circle={circle} currency={currency} />
        ))}
      </Stack>

      <SectionHeader title="Activity feed" />
      <SoftCard>
        {recentActivity.map((expense, i) => {
          const circle = getCircle(expense.circleId);
          const payer = getMember(expense.payerId);
          return (
            <Row
              key={expense.id}
              icon={circle?.icon ?? "＋"}
              title={expense.title}
              subtitle={`${circle?.name} · paid by ${payer?.name}`}
              last={i === recentActivity.length - 1}
              trailing={
                <div style={{ fontSize: 12, fontWeight: 700, color: "#8C9AAF" }}>
                  {formatCurrency(expense.amountCents, currency)}
                </div>
              }
            />
          );
        })}
      </SoftCard>
    </div>
  );
}
