import { Stack, Typography } from "@mui/material";

import { formatSignedCurrency, type Currency } from "@/lib/format/currency";
import { BRAND_TINT } from "@/lib/theme/theme";
import type { Member } from "@/lib/domain/types";
import type { Circle } from "@/lib/domain/types";
import { ActionButton } from "@/components/common/ActionButton";

export function OpenBalanceRow({
  member,
  circle,
  amountCents,
  currency,
  onRecord,
  last = false,
}: {
  member: Member;
  circle: Circle | undefined;
  amountCents: number;
  currency: Currency;
  onRecord: () => void;
  last?: boolean;
}) {
  return (
    <Stack
      direction="row"
      spacing="13px"
      sx={{ alignItems: "center", py: "15px", borderBottom: last ? "none" : "1px solid", borderColor: "divider" }}
    >
      <Stack
        sx={{
          width: 45,
          height: 45,
          borderRadius: "50%",
          bgcolor: BRAND_TINT,
          color: "primary.main",
          fontWeight: 800,
          fontSize: 13,
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {member.initials}
      </Stack>
      <Stack sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: 12, fontWeight: 700 }}>{member.name}</Typography>
        <Typography sx={{ color: "#8C9AAF", fontSize: 10, mt: "5px" }}>{circle?.name}</Typography>
      </Stack>
      <Typography sx={{ fontSize: 12, fontWeight: 800 }} color={amountCents >= 0 ? "success.main" : "error.main"}>
        {formatSignedCurrency(amountCents, currency)}
      </Typography>
      <ActionButton variant="soft" onClick={onRecord} sx={{ py: "8px", px: "14px" }}>
        Settle
      </ActionButton>
    </Stack>
  );
}
