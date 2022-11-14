import "./ButtonsStyle.css";
import { Button, Box } from "@mui/material";

const Buttons = ({ variant = "contained", text = "", type = "button" }) => {
  return (
    <Box component="div">
      <Button className="styledButton" variant={variant} type={type}>
        {text}
      </Button>
    </Box>
  );
};

export { Buttons };
