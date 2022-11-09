import { Box, Typography } from "@mui/material";
import { styleFormLogin } from "./LoginStyle";
import { HelmetTitle } from "../../shared/components/HelmetTitle";
import { Header } from "../../shared/components/header/Header";
import { Inputs } from "../../shared/components/inputs/Inputs";
import { Buttons } from "../../shared/components/buttons/Buttons";
import { Password } from "../../shared/components/inputs/Password";

const Login = () => {
  return (
    <>
      <HelmetTitle title="Acessar conta" />

      <Header />

      <Box component="form" onSubmit={(e) => {}} sx={{ ...styleFormLogin }}>
        <Box component="section">
          <Typography component="h4" variant="h4">
            Login
          </Typography>
        </Box>

        <Box component="section" sx={{ display: "grid", gap: "20px" }}>
          <Inputs label="Email" type="email" autoFocus={true} />

          <Password label="Password *" />
        </Box>

        <Buttons text="Login" type="submit" />
      </Box>
    </>
  );
};

export { Login };
