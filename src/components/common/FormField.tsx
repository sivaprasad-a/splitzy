import { Box, Typography, type TextFieldProps, TextField } from "@mui/material";

export function FormField({ label, sx, ...props }: TextFieldProps & { label: string }) {
  return (
    <Box sx={{ display: "grid", gap: "8px", ...(sx as object) }}>
      <Typography component="label" sx={{ fontSize: 11, fontWeight: 800, color: "#74869D" }}>
        {label}
      </Typography>
      <TextField
        {...props}
        label={undefined}
        fullWidth
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            height: 44,
            borderRadius: "11px",
            bgcolor: "white",
            fontSize: 13,
            "& fieldset": { borderColor: "#DDE6F2" },
          },
        }}
      />
    </Box>
  );
}
