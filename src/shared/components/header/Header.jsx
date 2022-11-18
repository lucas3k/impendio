import "./HeaderStyle.css";
import { Box, Typography } from "@mui/material";
import { BiDollar } from "react-icons/bi";
import { Buttons } from "../buttons/Buttons";

const Header = ({ isLogout = false, handleClick = () => {} }) => {
  return (
    <Box component="header" className="styleHeader">
      <Box component="section" className="styleHeaderContainer">
        <Box component="section" className="styleHeaderTitleContainer">
          <Typography
            component="h1"
            variant="h2"
            color="#1aae9e"
            fontWeight="600"
            sx={{ fontSize: "3rem", p: 0.3 }}
          >
            Impendio
          </Typography>

          <BiDollar color="#1aae9e" />
        </Box>

        {isLogout && <Buttons text="Sair" handleClick={handleClick} />}
      </Box>
    </Box>
  );
};

export { Header };
