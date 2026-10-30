import { Box, Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box component="main" sx={{ minHeight: "100dvh", display: "grid", placeItems: "center", px: 3 }}>
      <Stack spacing={1} sx={{ textAlign: "center" }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }} color="primary">
          Splitzy
        </Typography>
        <Typography variant="body1" component="p" color="text.secondary">
          Phase 1 foundation: PWA scaffold, design system, auth, Postgres and CI/CD.
        </Typography>
      </Stack>
    </Box>
  );
}
