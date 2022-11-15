import "./ButtonsStyle.css";
import { Button, Box } from "@mui/material";

const Buttons = ({
  variant = "contained",
  text = "",
  type = "button",
  disabled = false,
  handleClick = () => {},
}) => {
  return (
    <Box component="div">
      <Button
        sx={{ height: "100%" }}
        className="styledButton"
        variant={variant}
        type={type}
        disabled={disabled}
        onClick={handleClick}
      >
        {text}
      </Button>
    </Box>
  );
};

export { Buttons };
