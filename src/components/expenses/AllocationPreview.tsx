import { Alert, Paper, Stack, Typography } from "@mui/material";

import { formatCurrency, type Currency } from "@/lib/format/currency";
import type { Member } from "@/lib/domain/types";
import type { SplitResult } from "@/lib/split/calculateSplit";

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
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
        Allocation preview
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {participants.length} participants
      </Typography>

      <Stack spacing={1.5} sx={{ mb: 2 }}>
        {participants.map((member) => (
          <Stack key={member.id} direction="row" sx={{ justifyContent: "space-between" }}>
            <Typography sx={{ fontWeight: 600 }}>{member.name}</Typography>
            <Typography>{formatCurrency(result.shares[member.id] ?? 0, currency)}</Typography>
          </Stack>
        ))}
      </Stack>

      <Alert severity={result.valid ? "success" : "warning"} variant="outlined">
        {result.valid
          ? `Shares total ${formatCurrency(result.totalCents, currency)}`
          : result.error}
      </Alert>
    </Paper>
  );
}
