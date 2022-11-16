import "./DashBoardStyle.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import { Header } from "../../shared/components/header/Header";
import { HelmetTitle } from "../../shared/components/HelmetTitle";
import { api } from "../../shared/services/api/api";
import { Buttons } from "../../shared/components/buttons/Buttons";
import { ModalBase } from "./components/ModalBase";
import { ModalDados } from "./components/ModalDados";
import { Notification } from "../../shared/components/Notification";

const Dashboard = () => {
  const navigate = useNavigate();

  const [valueReal, setValueReal] = useState("");
  const [description, setDescription] = useState("");
  const [valueDate, setValueDate] = useState(moment());

  const [allTransaction, setAllTransaction] = useState([]);
  const [token, setToken] = useState("");

  const [fullRevenues, setFullRevenues] = useState(0);
  const [fullExpenses, setFullExpenses] = useState(0);
  const [fullBalance, setFullBalance] = useState(0);

  const [openModalNewItem, setOpenModalNewItem] = useState(false);
  const toggleOpenedModalNewItem = () => setOpenModalNewItem(!openModalNewItem);

  const queryGetAllTransaction = () => {
    if (!token) return;

    api
      .get("/transaction", { headers: { "x-access-token": token } })
      .then((response) => setAllTransaction(response.data))
      .catch((error) => {
        Notification("error", error.response.data.error.message);
      });
  };

  useEffect(() => {
    const isToken = localStorage.getItem("token");
    if (isToken) setToken(isToken);
  }, []);

  useEffect(() => {
    queryGetAllTransaction();
  }, [token]);

  useEffect(() => {
    const value = allTransaction.reduce((acc, item) => (acc += item.value), 0);
    setFullRevenues(value);
  }, [allTransaction]);

  const handleClickLogout = () => {
    setToken("");
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
        Notification("info", response.data.message);
      })
      .catch((error) =>
        Notification("error", error.response.data.error.message)
      )
      .finally(() => queryGetAllTransaction());
  };

  const getDados = () => {
    const real = Number(valueReal.trim());
    const desc = description.trim();
    const data = new Date(valueDate).toISOString();

    if (real === "" || desc === "" || data === "") {
      Notification("info", "Preencha todos os campos!");
      return;
    }

    if (openModalNewItem) {
      newRevenues(real, desc, data);

      toggleOpenedModalNewItem();
    }
  };

  const formatNumberToBR = (num = 0) => {
    return Number(num).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <>
      <HelmetTitle title="Dashboard" />

      <Header isLogout={true} handleClick={handleClickLogout} />

      <Box component="section" className="containerDash">
        <Box component="section" className="containerInputsDash">
          <Box className="containerModalBtn">
            <Typography component="p">
              {!!fullRevenues
                ? `Receitas ${formatNumberToBR(fullRevenues)}`
                : "Receitas - sem valor"}
            </Typography>

            <Buttons text="+" handleClick={toggleOpenedModalNewItem} />
          </Box>

          <Box className="containerModalBtn">
            <Typography component="p">
              {!!fullExpenses
                ? `Despesas ${formatNumberToBR(fullExpenses)}`
                : "Despesas - sem valor"}
            </Typography>

            <Buttons text="+" />
          </Box>

          <Box>
            <Typography component="p">
              {`Valor total: ${formatNumberToBR(fullRevenues - fullExpenses)}`}
            </Typography>
          </Box>
        </Box>

        {!!allTransaction.length && (
          <TableContainer component="section" sx={{ mt: 4 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Tipo</TableCell>
                  <TableCell align="right">Valor</TableCell>
                  <TableCell align="right">Descrição</TableCell>
                  <TableCell align="right">Data</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {allTransaction
                  .map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.typeId}
                      </TableCell>
                      <TableCell align="right">
                        {formatNumberToBR(row.value)}
                      </TableCell>
                      <TableCell align="right">{row.description}</TableCell>
                      <TableCell align="right">
                        {moment(row.date).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell align="right">
                        <Button>Editar</Button>
                        <Button>Excluir</Button>
                      </TableCell>
                    </TableRow>
                  ))
                  .reverse()}
              </TableBody>
            </Table>
          </TableContainer>
        )}
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
