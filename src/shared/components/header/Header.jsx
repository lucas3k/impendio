import { Box, Typography } from "@mui/material";
import { BiDollar } from "react-icons/bi";
import { Buttons } from "../buttons/Buttons";
import {
  styleHeader,
  styleHeaderContainer,
  styleHeaderTitleContainer,
} from "./HeaderStyle";

const Header = ({ isLogout = false }) => {
  return (
    <Box component="header" sx={{ ...styleHeader }}>
      <Box component="section" sx={{ ...styleHeaderContainer }}>
        <Box component="section" sx={{ ...styleHeaderTitleContainer }}>
          <Typography
            component="h1"
            variant="h2"
            color="#1aae9e"
            fontWeight="600"
          >
            Impendio
          </Typography>

          <BiDollar color="#1aae9e" />
        </Box>

        {isLogout && <Buttons text="Sair" />}
      </Box>
    </Box>
  );
};

export { Header };
