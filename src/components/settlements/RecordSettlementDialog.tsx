"use client";

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

import { formatCurrency, type Currency } from "@/lib/format/currency";

export function RecordSettlementDialog({
  open,
  memberName,
  amountCents,
  currency,
  onClose,
  onConfirm,
}: {
  open: boolean;
  memberName: string;
  amountCents: number;
  currency: Currency;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Record outside payment</DialogTitle>
      <DialogContent>
        <Typography>
          Confirm {formatCurrency(Math.abs(amountCents), currency)} {amountCents >= 0 ? "received from" : "paid to"}{" "}
          {memberName}. This only records the payment — Splitzy never moves funds.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
