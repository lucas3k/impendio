import { Box, TextField } from "@mui/material";

const Inputs = ({
  label = "",
  variant = "outlined",
  type = "text",
  autoFocus = false,
  handleChange = () => {},
  disabled = false,
}) => {
  return (
    <Box component="div" sx={{ flex: 1 }}>
      <TextField
        label={label}
        variant={variant}
        type={type}
        autoFocus={autoFocus}
        onChange={handleChange}
        disabled={disabled}
        fullWidth
        required
      />
    </Box>
  );
};

export { Inputs };
