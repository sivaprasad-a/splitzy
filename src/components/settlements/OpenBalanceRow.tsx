import { Avatar, Button, Stack, Typography } from "@mui/material";

import { formatSignedCurrency, type Currency } from "@/lib/format/currency";
import { BRAND_TINT } from "@/lib/theme/theme";
import type { Member } from "@/lib/domain/types";
import type { Circle } from "@/lib/domain/types";

export function OpenBalanceRow({
  member,
  circle,
  amountCents,
  currency,
  onRecord,
}: {
  member: Member;
  circle: Circle | undefined;
  amountCents: number;
  currency: Currency;
  onRecord: () => void;
}) {
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "space-between", py: 1.5 }}>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Avatar sx={{ bgcolor: BRAND_TINT, color: "primary.main", fontWeight: 700 }}>{member.initials}</Avatar>
        <Stack>
          <Typography sx={{ fontWeight: 600 }}>{member.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {circle?.name}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Typography sx={{ fontWeight: 700 }} color={amountCents >= 0 ? "success.main" : "error.main"}>
          {formatSignedCurrency(amountCents, currency)}
        </Typography>
        <Button variant="outlined" size="small" onClick={onRecord}>
          Record
        </Button>
      </Stack>
    </Stack>
  );
}
