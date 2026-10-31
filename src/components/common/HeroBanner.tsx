import { Box, Stack, Tooltip, Typography } from "@mui/material";

import { ActionButton } from "./ActionButton";

export function HeroBanner() {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "24px",
        color: "white",
        minHeight: 210,
        p: { xs: "24px", md: "29px 34px" },
        mb: "20px",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        gap: 3,
        background:
          "radial-gradient(circle at 80% 15%, #255da6, transparent 43%), linear-gradient(110deg, #07152F, #10386E)",
        "&::before": {
          content: '""',
          position: "absolute",
          width: 370,
          height: 370,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.13)",
          right: -60,
          top: -90,
          boxShadow: "0 0 0 65px rgba(255,255,255,0.03), 0 0 0 130px rgba(255,255,255,0.02)",
        },
      }}
    >
      <Stack spacing={1.5} sx={{ position: "relative", maxWidth: 420 }}>
        <Typography sx={{ color: "#75DEFF", fontSize: 10, fontWeight: 800, letterSpacing: "1.8px" }}>
          ✦ SPLITZY INTELLIGENCE
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: 22, md: 26 }, letterSpacing: "-0.8px", fontWeight: 800 }}>
          Money feels better
          <br />
          when it&apos;s in sync.
        </Typography>
        <Typography sx={{ color: "#B7CBE8", fontSize: 11, lineHeight: 1.8, maxWidth: 390 }}>
          Every bill, balance and saving goal. Beautifully connected in one place.
        </Typography>
        <Tooltip title="Splitzy IQ is planned for a later phase">
          <span>
            <ActionButton
              disabled
              sx={{ bgcolor: "white", color: "#12477D", "&.Mui-disabled": { bgcolor: "white", color: "#12477D", opacity: 0.85 } }}
            >
              ✦ Explore your insights →
            </ActionButton>
          </span>
        </Tooltip>
      </Stack>

      {/* eslint-disable-next-line @next/next/no-img-element -- static brand SVG */}
      <img
        src="/brand/splitzy-symbol.svg"
        alt=""
        width={155}
        style={{
          position: "relative",
          filter: "drop-shadow(0 15px 22px rgba(0,0,0,0.3))",
          animation: "splitzy-float 5s ease-in-out infinite",
        }}
      />
    </Box>
  );
}
