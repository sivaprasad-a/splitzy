import { Button, type ButtonProps } from "@mui/material";

import { BRAND_COLORS } from "@/lib/theme/theme";

const BASE_SX = {
  borderRadius: "12px",
  px: "17px",
  py: "12px",
  fontWeight: 800,
  fontSize: 11,
  transition: "transform .2s",
};

const VARIANT_SX: Record<"primary" | "secondary" | "soft", ButtonProps["sx"]> = {
  primary: {
    background: `linear-gradient(110deg, ${BRAND_COLORS.splitzyBlue}, #38A7FF)`,
    color: "white",
    boxShadow: "0 10px 20px rgba(22,119,255,0.2)",
    "&:hover": {
      background: `linear-gradient(110deg, ${BRAND_COLORS.splitzyBlue}, #38A7FF)`,
      transform: "translateY(-2px)",
    },
  },
  secondary: {
    bgcolor: "white",
    color: "#244567",
    border: "1px solid #E1E9F3",
    "&:hover": { bgcolor: "#f7faff", transform: "translateY(-2px)" },
  },
  soft: {
    bgcolor: "#E8F3FF",
    color: BRAND_COLORS.splitzyBlue,
    "&:hover": { bgcolor: "#d9ebff", transform: "translateY(-2px)" },
  },
};

export function ActionButton({
  variant = "primary",
  sx,
  ...props
}: Omit<ButtonProps, "variant"> & { variant?: "primary" | "secondary" | "soft" }) {
  return <Button disableElevation sx={[BASE_SX, VARIANT_SX[variant], ...(Array.isArray(sx) ? sx : [sx])]} {...props} />;
}
