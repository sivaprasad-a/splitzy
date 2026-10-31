import { Box, Stack, Typography } from "@mui/material";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{ justifyContent: "space-between", alignItems: { sm: "center" }, mb: "25px" }}
    >
      <Box>
        <Typography sx={{ color: "primary.main", fontSize: 10, fontWeight: 800, letterSpacing: "1.8px", textTransform: "uppercase" }}>
          {eyebrow}
        </Typography>
        <Typography variant="h1" sx={{ fontSize: { xs: 24, md: 32 }, letterSpacing: "-1.3px", my: "7px", fontWeight: 800 }}>
          {title}
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: 12, lineHeight: 1.8, maxWidth: 480 }}>
          {subtitle}
        </Typography>
      </Box>
      {action}
    </Stack>
  );
}
