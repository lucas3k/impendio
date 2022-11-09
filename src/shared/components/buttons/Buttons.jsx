import { Button, Box } from "@mui/material";
import { styledButton } from "./ButtonsStyle";

const Buttons = ({ variant = "contained", text = "", type = "button" }) => {
  return (
    <Box component="div">
      <Button sx={{ ...styledButton }} variant={variant} type={type}>
        {text}
      </Button>
    </Box>
  );
};

export { Buttons };
