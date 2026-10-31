import { Button, Stack, Typography } from "@mui/material";

export function SectionHeader({
  title,
  actionLabel,
  onAction,
}: {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mt: "26px", mb: "16px" }}>
      <Typography sx={{ fontSize: 15, fontWeight: 800 }}>{title}</Typography>
      {actionLabel && (
        <Button
          onClick={onAction}
          sx={{ color: "primary.main", fontSize: 11, fontWeight: 800, minWidth: 0, p: 0 }}
        >
          {actionLabel} →
        </Button>
      )}
    </Stack>
  );
}
