"use client";

import { useRouter } from "next/navigation";
import { Box, Button, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setAiPanelOpen } from "@/lib/store/slices/preferencesSlice";
import { BRAND_COLORS } from "@/lib/theme/theme";

const CHOICES = [
  { label: "Where did my money go? →", href: undefined, note: "Personal tracker is planned for a later phase" },
  { label: "What if I save more? →", href: undefined, note: "Savings studio is planned for a later phase" },
  { label: "Who should I settle with? →", href: "/settlements", note: undefined },
];

export function SplitzyIQLauncher() {
  const open = useAppSelector((state) => state.preferences.aiPanelOpen);
  const dispatch = useAppDispatch();
  const setOpen = (value: boolean) => dispatch(setAiPanelOpen(value));
  const router = useRouter();

  return (
    <>
      {open && (
        <Paper
          sx={{
            position: "fixed",
            right: { xs: 12, sm: 24 },
            bottom: { xs: 135, sm: 82 },
            zIndex: 1300,
            width: "min(355px, calc(100vw - 40px))",
            border: "1px solid #DCE7F6",
            borderRadius: "22px",
            p: "22px",
            boxShadow: "0 30px 70px rgba(8,29,68,0.2)",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography sx={{ fontSize: 15, fontWeight: 800 }}>✦ Splitzy IQ</Typography>
            <IconButton size="small" onClick={() => setOpen(false)} aria-label="Close">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <Typography sx={{ fontSize: 11, color: "#7287A1", lineHeight: 1.8, mb: 1 }}>
            Choose a guided insight. This is not a live AI service.
          </Typography>
          {CHOICES.map((choice) =>
            choice.href ? (
              <Button
                key={choice.label}
                fullWidth
                onClick={() => {
                  setOpen(false);
                  router.push(choice.href!);
                }}
                sx={{
                  display: "block",
                  textAlign: "left",
                  bgcolor: "#EEF6FF",
                  color: "#196CBE",
                  p: "12px",
                  my: "8px",
                  borderRadius: "10px",
                  fontWeight: 800,
                  fontSize: 11,
                  "&:hover": { bgcolor: "#dcecff" },
                }}
              >
                {choice.label}
              </Button>
            ) : (
              <Tooltip key={choice.label} title={choice.note}>
                <span style={{ display: "block" }}>
                  <Button
                    fullWidth
                    disabled
                    sx={{
                      display: "block",
                      textAlign: "left",
                      bgcolor: "#EEF6FF",
                      color: "#196CBE",
                      p: "12px",
                      my: "8px",
                      borderRadius: "10px",
                      fontWeight: 800,
                      fontSize: 11,
                      "&.Mui-disabled": { bgcolor: "#EEF6FF", color: "#196CBE", opacity: 0.55 },
                    }}
                  >
                    {choice.label}
                  </Button>
                </span>
              </Tooltip>
            ),
          )}
          <Typography sx={{ fontSize: 10, color: "#94A3B8", lineHeight: 1.8, mt: 1 }}>
            Educational preview, not financial advice.
          </Typography>
        </Paper>
      )}

      <Button
        onClick={() => setOpen(!open)}
        sx={{
          position: "fixed",
          right: { xs: 12, sm: 25 },
          bottom: { xs: 78, sm: 24 },
          zIndex: 1300,
          background: `linear-gradient(110deg, ${BRAND_COLORS.splitzyBlue}, ${BRAND_COLORS.electricCyan})`,
          color: "white",
          borderRadius: "15px",
          px: "18px",
          py: "16px",
          fontWeight: 800,
          fontSize: 12,
          boxShadow: "0 16px 34px rgba(22,119,255,0.28)",
          "&:hover": {
            background: `linear-gradient(110deg, ${BRAND_COLORS.splitzyBlue}, ${BRAND_COLORS.electricCyan})`,
          },
        }}
      >
        ✦ Ask Splitzy IQ
      </Button>
    </>
  );
}
