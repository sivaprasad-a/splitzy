"use client";

import { useState } from "react";
import { Box, Paper, Snackbar, Stack, Typography } from "@mui/material";

import { useAppSelector } from "@/lib/store/hooks";
import { formatCurrency } from "@/lib/format/currency";
import { getCircle, getMember, settlements } from "@/lib/domain/mock-data";
import { BRAND_COLORS } from "@/lib/theme/theme";
import { OpenBalanceRow } from "@/components/settlements/OpenBalanceRow";
import { RecordSettlementDialog } from "@/components/settlements/RecordSettlementDialog";

export default function SettlementsPage() {
  const currency = useAppSelector((state) => state.preferences.currency);
  const [activeSettlementId, setActiveSettlementId] = useState<string | null>(null);
  const [confirmedMessage, setConfirmedMessage] = useState<string | null>(null);

  const netPositionCents = settlements.reduce((sum, s) => sum + s.amountCents, 0);
  const activeSettlement = settlements.find((s) => s.id === activeSettlementId) ?? null;

  return (
    <Stack spacing={4}>
      <Stack spacing={0.5}>
        <Typography variant="overline" color="text.secondary">
          Workspace / Settlements
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Settle up, stay friends.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manual reconciliation today; payment provider connectivity later.
        </Typography>
      </Stack>

      <Paper sx={{ p: 4, borderRadius: 3, bgcolor: BRAND_COLORS.midnightNavy, color: "white" }}>
        <Typography variant="overline" sx={{ opacity: 0.7 }}>
          Net position
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          {formatCurrency(Math.abs(netPositionCents), currency)}{" "}
          {netPositionCents >= 0 ? "coming your way" : "you owe overall"}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
          Paybacks are always traceable and clearly labeled.
        </Typography>
      </Paper>

      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Open balances
        </Typography>
        <Stack divider={<Box sx={{ borderBottom: "1px solid", borderColor: "divider" }} />}>
          {settlements.map((settlement) => {
            const member = getMember(settlement.memberId);
            if (!member) return null;
            return (
              <OpenBalanceRow
                key={settlement.id}
                member={member}
                circle={getCircle(settlement.circleId)}
                amountCents={settlement.amountCents}
                currency={currency}
                onRecord={() => setActiveSettlementId(settlement.id)}
              />
            );
          })}
        </Stack>
      </Paper>

      <Typography variant="body2" color="text.secondary">
        Future: authorize payment → processing → provider confirmation → ledger reconciliation.
      </Typography>

      {activeSettlement && (
        <RecordSettlementDialog
          open
          memberName={getMember(activeSettlement.memberId)?.name ?? ""}
          amountCents={activeSettlement.amountCents}
          currency={currency}
          onClose={() => setActiveSettlementId(null)}
          onConfirm={() => {
            setConfirmedMessage(`Recorded settlement with ${getMember(activeSettlement.memberId)?.name}.`);
            setActiveSettlementId(null);
          }}
        />
      )}

      <Snackbar
        open={!!confirmedMessage}
        autoHideDuration={4000}
        onClose={() => setConfirmedMessage(null)}
        message={confirmedMessage}
      />
    </Stack>
  );
}
