"use client";

import { useState } from "react";
import { Box, Snackbar, Stack, Typography } from "@mui/material";

import { useAppSelector } from "@/lib/store/hooks";
import { formatCurrency } from "@/lib/format/currency";
import { getCircle, getMember, settlements } from "@/lib/domain/mock-data";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionHeader } from "@/components/common/SectionHeader";
import { SoftCard } from "@/components/common/SoftCard";
import { OpenBalanceRow } from "@/components/settlements/OpenBalanceRow";
import { RecordSettlementDialog } from "@/components/settlements/RecordSettlementDialog";

export default function SettlementsPage() {
  const currency = useAppSelector((state) => state.preferences.currency);
  const [activeSettlementId, setActiveSettlementId] = useState<string | null>(null);
  const [confirmedMessage, setConfirmedMessage] = useState<string | null>(null);

  const netPositionCents = settlements.reduce((sum, s) => sum + s.amountCents, 0);
  const activeSettlement = settlements.find((s) => s.id === activeSettlementId) ?? null;

  return (
    <Box>
      <PageHeader
        eyebrow="Close the loop"
        title="Settle up"
        subtitle="Keep group balances clear. Real payment integrations are planned for later."
      />

      <Box
        sx={{
          borderRadius: "24px",
          p: { xs: "24px", md: "29px 34px" },
          mb: "20px",
          minHeight: 150,
          color: "white",
          background:
            "radial-gradient(circle at 80% 15%, #255da6, transparent 43%), linear-gradient(110deg, #07152F, #10386E)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box>
          <Typography sx={{ color: "#80DFFF", fontSize: 10, fontWeight: 800, letterSpacing: "1.8px" }}>
            NET BALANCE
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: 22, md: 26 }, letterSpacing: "-0.8px", fontWeight: 800, my: "7px" }}>
            {formatCurrency(Math.abs(netPositionCents), currency)}{" "}
            {netPositionCents >= 0 ? "coming your way" : "you owe overall"}
          </Typography>
          <Typography sx={{ color: "#B7CBE8", fontSize: 11 }}>
            Know who owes whom, all in one place.
          </Typography>
        </Box>
        <Typography sx={{ fontSize: 70, opacity: 0.9, display: { xs: "none", sm: "block" } }}>⇄</Typography>
      </Box>

      <SectionHeader title="Open balances" />
      <SoftCard>
        {settlements.map((settlement, i) => {
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
              last={i === settlements.length - 1}
            />
          );
        })}
      </SoftCard>

      <Stack
        direction="row"
        spacing="12px"
        sx={{ bgcolor: "#EBF5FF", border: "1px solid #DBEAFF", borderRadius: "15px", p: "16px", mt: "20px" }}
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
          🔒
        </Box>
        <Box>
          <Typography sx={{ fontSize: 11, fontWeight: 700 }}>Payments are coming later</Typography>
          <Typography sx={{ fontSize: 10, color: "#7087A1", lineHeight: 1.8, mt: "5px" }}>
            Recording a settlement here doesn&apos;t move money. Future payment methods will require secure
            authorization and confirmation.
          </Typography>
        </Box>
      </Stack>

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
    </Box>
  );
}
