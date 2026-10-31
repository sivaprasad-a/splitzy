import { Box, Stack, Typography } from "@mui/material";

export function RowTile({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        width: 45,
        height: 45,
        borderRadius: "13px",
        bgcolor: "#E9F4FF",
        display: "grid",
        placeItems: "center",
        fontSize: 19,
        flexShrink: 0,
      }}
    >
      {children}
    </Box>
  );
}

export function Row({
  icon,
  title,
  subtitle,
  trailing,
  last = false,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  trailing: React.ReactNode;
  last?: boolean;
}) {
  return (
    <Stack
      direction="row"
      spacing="13px"
      sx={{
        alignItems: "center",
        py: "15px",
        borderBottom: last ? "none" : "1px solid",
        borderColor: "divider",
      }}
    >
      <RowTile>{icon}</RowTile>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: 12, fontWeight: 700 }}>{title}</Typography>
        <Typography sx={{ color: "#8C9AAF", fontSize: 10, mt: "5px" }}>{subtitle}</Typography>
      </Box>
      {trailing}
    </Stack>
  );
}
