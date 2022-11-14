import "./LoginStyle.css";
import { Box, Typography } from "@mui/material";
import { HelmetTitle } from "../../shared/components/HelmetTitle";
import { Header } from "../../shared/components/header/Header";
import { Inputs } from "../../shared/components/inputs/Inputs";
import { Buttons } from "../../shared/components/buttons/Buttons";
import { Password } from "../../shared/components/inputs/Password";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword(!showPassword);

  const handleLogin = (e) => {
    e.preventDefault();

    console.log({ email, password });
  };

  return (
    <>
      <HelmetTitle title="Acessar conta" />

      <Header />

      <Box component="div" className="styleContainerLogin">
        <Box component="form" onSubmit={handleLogin} className="styleFormLogin">
          <Box component="section">
            <Typography component="h4" variant="h4">
              Login
            </Typography>
          </Box>

          <Box component="section" sx={{ display: "grid", gap: "20px" }}>
            <Inputs
              label="Email"
              type="email"
              autoFocus={true}
              value={email}
              handleChange={({ target }) => setEmail(target.value)}
            />

            <Password
              label="Password *"
              value={password}
              handleChange={({ target }) => setPassword(target.value)}
              isVisibility={showPassword}
              toggleVisibility={toggleVisibility}
            />
          </Box>

          <Buttons text="Login" type="submit" />

          <Box component="section">
            <Typography
              component="p"
              sx={{ textAlign: "right", fontSize: "12px" }}
            >
              Não possui conta?{" "}
              <Link to="/register" className="a">
                Registre-se
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export { Login };
