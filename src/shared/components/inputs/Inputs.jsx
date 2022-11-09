import { Box, TextField } from "@mui/material";

const Inputs = ({
  label = "",
  variant = "outlined",
  type = "text",
  autoFocus = false,
}) => {
  return (
    <Box component="div">
      <TextField
        label={label}
        variant={variant}
        type={type}
        autoFocus={autoFocus}
        fullWidth
        required
      />
    </Box>
  );
};

export { Inputs };
