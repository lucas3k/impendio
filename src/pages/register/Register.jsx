import { Header } from "../../shared/components/header/Header";
import { HelmetTitle } from "../../shared/components/HelmetTitle";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Inputs } from "../../shared/components/inputs/Inputs";
import { Password } from "../../shared/components/inputs/Password";
import { Buttons } from "../../shared/components/buttons/Buttons";
import { api } from "../../shared/services/api/api";
import { Notification } from "../../shared/components/Notification";

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword(!showPassword);

  const handleRegister = (e) => {
    e.preventDefault();

    const credentials = btoa(`${email.trim()}:${password.trim()}`);
    const basicAuth = "Basic " + credentials;

    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      Notification("info", "Preencha todos os campos!");
      return;
    }

    setDisabled(true);
    api
      .post(
        "/user",
        { firstName, lastName },
        { headers: { Authorization: basicAuth } }
      )
      .then((response) => {
        Notification("success", response.data.message);
        setTimeout(() => {
          navigate("/");
        }, 2300);
      })
      .catch((error) =>
        Notification("warning", error.response.data.error.message)
      )
      .finally(() => setDisabled(false));
  };

  return (
    <>
      <HelmetTitle title="Cadastre-se" />

      <Header />

      <Box component="div" className="styleContainerLogin">
        <Box
          component="form"
          onSubmit={handleRegister}
          className="styleFormLogin"
        >
          <Box component="section">
            <Typography component="h4" variant="h4">
              Register
            </Typography>
          </Box>

          <Box component="section" sx={{ display: "grid", gap: "20px" }}>
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                justifyContent: "space-between",
              }}
            >
              <Inputs
                autoFocus={true}
                label="Primeiro nome"
                type="text"
                value={firstName}
                handleChange={({ target }) => setFirstName(target.value)}
              />

              <Inputs
                label="Último nome"
                type="text"
                value={lastName}
                handleChange={({ target }) => setLastName(target.value)}
              />
            </Box>

            <Inputs
              label="Email"
              type="email"
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

          <Buttons text="Cadastrar" type="submit" disabled={disabled} />

          <Box component="section">
            <Typography
              component="p"
              sx={{ textAlign: "right", fontSize: "12px" }}
            >
              Já possui conta?{" "}
              <Link to="/" className="a">
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export { Register };
