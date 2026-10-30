import { Paper, Stack, Typography } from "@mui/material";

interface StatCardProps {
  label: string;
  value: string;
  caption?: string;
  captionColor?: "success.main" | "error.main" | "text.secondary";
}

export function StatCard({ label, value, caption, captionColor = "text.secondary" }: StatCardProps) {
  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, flex: 1, minWidth: 220 }}>
      <Stack spacing={0.5}>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {value}
        </Typography>
        {caption && (
          <Typography variant="body2" sx={{ color: captionColor, fontWeight: 600 }}>
            {caption}
          </Typography>
        )}
      </Stack>
    </Paper>
  );
}
