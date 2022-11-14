import { Box, TextField } from "@mui/material";

const Inputs = ({
  label = "",
  variant = "outlined",
  type = "text",
  autoFocus = false,
  handleChange = () => {},
}) => {
  return (
    <Box component="div" sx={{ flex: 1 }}>
      <TextField
        label={label}
        variant={variant}
        type={type}
        autoFocus={autoFocus}
        onChange={handleChange}
        fullWidth
        required
      />
    </Box>
  );
};

export { Inputs };
