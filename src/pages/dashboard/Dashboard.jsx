import "./DashBoardStyle.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import moment from "moment";
import { Header } from "../../shared/components/header/Header";
import { HelmetTitle } from "../../shared/components/HelmetTitle";
import { api } from "../../shared/services/api/api";
import { Inputs } from "../../shared/components/inputs/Inputs";
import { Buttons } from "../../shared/components/buttons/Buttons";
import { ModalBase } from "./components/ModalBase";
import { ModalDados } from "./components/ModalDados";
import { Notification } from "../../shared/components/Notification";

const Dashboard = () => {
  const navigate = useNavigate();

  const [valueReal, setValueReal] = useState("");
  const [description, setDescription] = useState("");
  const [valueDate, setValueDate] = useState(moment());

  const [openModalNewItem, setOpenModalNewItem] = useState(false);
  const toggleOpenedModalNewItem = () => setOpenModalNewItem(!openModalNewItem);

  const token = localStorage.getItem("token");

  const handleClickLogout = () => {
    localStorage.removeItem("token");

    api
      .post("/logout", {}, { headers: { "x-access-token": token } })
      .finally(() => navigate("/", { replace: true }));
  };

  const newRevenues = (real, desc, data) => {
    api
      .post(
        "/transaction",
        {
          value: real,
          description: desc,
          date: data,
          typeId: 1,
        },
        { headers: { "x-access-token": token } }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        Notification("error", error.response.data.error.message);
      });
  };

  const getDados = () => {
    const real = Number(valueReal.trim());
    const desc = description.trim();
    const data = moment(valueDate).format("DD/MM/YYYY").trim();

    if (real === "" || desc === "" || data === "") {
      Notification("info", "Preencha todos os campos!");
      return;
    }

    if (openModalNewItem) {
      newRevenues(real, desc, data);

      toggleOpenedModalNewItem();
    }
  };

  return (
    <>
      <HelmetTitle title="Dashboard" />

      <Header isLogout={true} handleClick={handleClickLogout} />

      <Box component="section" className="containerDash">
        <Box component="section" className="containerInputsDash">
          <Box className="containerModalBtn">
            <Inputs label="Receita" disabled={true} />
            <Buttons text="+" handleClick={toggleOpenedModalNewItem} />
          </Box>

          <Box className="containerModalBtn">
            <Inputs label="Despesas" disabled={true} />
            <Buttons text="+" />
          </Box>

          <Inputs label="Saldo" disabled={true} />
        </Box>

        <h1>Dashboard</h1>
      </Box>

      <ModalBase
        open={openModalNewItem}
        toggleOpenedModal={toggleOpenedModalNewItem}
        title={`${openModalNewItem ? "Adicionar receita" : ""}`}
        subTitle="Informe os dados abaixo"
        getDados={getDados}
      >
        <ModalDados
          valueReal={valueReal}
          setValueReal={setValueReal}
          description={description}
          setDescription={setDescription}
          valueDate={valueDate}
          setValueDate={setValueDate}
        />
      </ModalBase>
    </>
  );
};

export { Dashboard };
