import { Alert, Stack, Typography } from "@mui/material";

import { formatCurrency, type Currency } from "@/lib/format/currency";
import type { Member } from "@/lib/domain/types";
import type { SplitResult } from "@/lib/split/calculateSplit";
import { SoftCard } from "@/components/common/SoftCard";

export function AllocationPreview({
  participants,
  result,
  currency,
}: {
  participants: Member[];
  result: SplitResult;
  currency: Currency;
}) {
  return (
    <SoftCard>
      <Typography sx={{ fontSize: 15, fontWeight: 800, mb: "4px" }}>Allocation preview</Typography>
      <Typography sx={{ color: "text.secondary", fontSize: 12, mb: "16px" }}>
        {participants.length} participants
      </Typography>

      <Stack spacing="12px" sx={{ mb: "16px" }}>
        {participants.map((member) => (
          <Stack key={member.id} direction="row" sx={{ justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: 12, fontWeight: 700 }}>{member.name}</Typography>
            <Typography sx={{ fontSize: 12 }}>{formatCurrency(result.shares[member.id] ?? 0, currency)}</Typography>
          </Stack>
        ))}
      </Stack>

      <Alert severity={result.valid ? "success" : "warning"} variant="outlined" sx={{ fontSize: 11, borderRadius: "11px" }}>
        {result.valid ? `Shares total ${formatCurrency(result.totalCents, currency)}` : result.error}
      </Alert>
    </SoftCard>
  );
}
