import { Box, Stack, Typography } from "@mui/material";

import { spendingRhythm } from "@/lib/domain/mock-data";

export function SpendingRhythmChart() {
  return (
    <Box>
      <Box
        sx={{
          height: 132,
          display: "flex",
          alignItems: "flex-end",
          gap: "10px",
          mt: "20px",
          borderBottom: "1px solid #E7EEF8",
        }}
      >
        {spendingRhythm.map((point, i) => (
          <Box
            key={point.month}
            sx={{
              flex: 1,
              height: `${point.pctOfPeak}%`,
              background: i === 4 ? "#DDECFB" : "linear-gradient(#4DB5FF, #1677FF)",
              borderRadius: "7px 7px 0 0",
              animation: "splitzy-rise 0.6s both",
              animationDelay: `${i * 0.07}s`,
              transformOrigin: "bottom",
            }}
          />
        ))}
      </Box>
      <Stack direction="row" sx={{ justifyContent: "space-around", color: "#9AA9BD", fontSize: 10, mt: "10px" }}>
        {spendingRhythm.map((point) => (
          <Typography key={point.month} component="span" sx={{ fontSize: 10, color: "inherit" }}>
            {point.month}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}
