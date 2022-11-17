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
import { BsTrash, BsPencil } from "react-icons/bs";

const Dashboard = () => {
  const navigate = useNavigate();

  const [valueReal, setValueReal] = useState("");
  const [description, setDescription] = useState("");
  const [valueDate, setValueDate] = useState(moment());
  const [valueEdit, setValueEdit] = useState([]);
  const [idItem, setIdItem] = useState(null);
  const [typeIdItem, setTypeIdItem] = useState(null);

  const [allTransaction, setAllTransaction] = useState([]);
  const [token, setToken] = useState("");

  const [fullRevenues, setFullRevenues] = useState(0);
  const [fullExpenses, setFullExpenses] = useState(0);

  const clearCamps = () => {
    setIdItem(null);
    setTypeIdItem(null);
    setValueReal("");
    setDescription("");
    setValueDate(moment());
  };

  const [openModalNewRevenues, setOpenModalNewRevenues] = useState(false);
  const toggleModalNewRevenues = () => {
    setOpenModalNewRevenues(!openModalNewRevenues);
  };

  const [openModalNewExpenses, setOpenModalNewExpenses] = useState(false);
  const toggleModalNewExpenses = () => {
    setOpenModalNewExpenses(!openModalNewExpenses);
  };

  const [openModalEdit, setOpenModalEdit] = useState(false);
  const toggleModalEdit = () => {
    setOpenModalEdit(!openModalEdit);
  };

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

  const getAllValues = (typeId) => {
    return allTransaction.reduce((acc, item) => {
      if (+item.typeId === typeId) return (acc += item.value);
      return acc;
    }, 0);
  };

  const handleClickLogout = () => {
    setToken("");
    localStorage.removeItem("token");

    api
      .post("/logout", {}, { headers: { "x-access-token": token } })
      .finally(() => navigate("/", { replace: true }));
  };

  const newTransaction = (real, desc, data, typeId) => {
    api
      .post(
        "/transaction",
        {
          value: real,
          description: desc,
          date: data,
          typeId: typeId,
        },
        { headers: { "x-access-token": token } }
      )
      .then((response) => {
        Notification("success", response.data.message);
      })
      .catch((error) =>
        Notification("error", error.response.data.error.message)
      )
      .finally(() => {
        queryGetAllTransaction();
      });
  };

  const editTransaction = (real, desc, data, typeId, id) => {
    api
      .patch(
        `/transaction/${id}`,
        {
          value: real,
          description: desc,
          date: data,
          typeId: typeId,
        },
        { headers: { "x-access-token": token } }
      )
      .then((response) => {
        Notification("success", response.data.message);
      })
      .catch((error) =>
        Notification("error", error.response.data.error.message)
      )
      .finally(() => {
        queryGetAllTransaction();
      });
  };

  const getDados = () => {
    const real = Number(valueReal.trim());
    const desc = description.trim();
    const data = new Date(valueDate).toISOString();

    if (real === "" || desc === "" || data === "") {
      Notification("info", "Preencha todos os campos!");
      return;
    }

    if (openModalNewRevenues) {
      newTransaction(real, desc, data, 1);

      toggleModalNewRevenues();
    }

    if (openModalNewExpenses) {
      newTransaction(real, desc, data, 2);

      toggleModalNewExpenses();
    }

    if (openModalEdit) {
      editTransaction(real, desc, data, typeIdItem, idItem);
      toggleModalEdit();
    }
  };

  const formatNumberToBR = (num = 0) => {
    return Number(num).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleDelete = (id) => {
    if (!token) return;

    api
      .delete(`/transaction/${id}`, { headers: { "x-access-token": token } })
      .then((response) => {
        Notification("success", response.data.message);
      })
      .catch((error) =>
        Notification("error", error.response.data.error.message)
      )
      .finally(() => queryGetAllTransaction());
  };

  const handleEdit = (id) => {
    const dados = allTransaction.find((item) => +item.id === id);

    setValueEdit([dados]);
    toggleModalEdit();
  };

  useEffect(() => {
    if (valueEdit.length) {
      setIdItem(valueEdit[0].id);
      setTypeIdItem(valueEdit[0].typeId);
      setValueReal(valueEdit[0].value);
      setDescription(valueEdit[0].description);
      setValueDate(moment(valueEdit[0].date));
    }
  }, [valueEdit]);

  useEffect(() => {
    if (!openModalNewRevenues && !openModalNewExpenses && !openModalEdit) {
      clearCamps();
    }
  }, [openModalNewRevenues, openModalNewExpenses, openModalEdit]);

  useEffect(() => {
    queryGetAllTransaction();
  }, [token]);

  useEffect(() => {
    const valueRevenues = getAllValues(1);
    const valueExpenses = getAllValues(2);

    setFullRevenues(valueRevenues);
    setFullExpenses(valueExpenses);
  }, [allTransaction]);

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

            <Buttons text="+ Receita" handleClick={toggleModalNewRevenues} />
          </Box>

          <Box className="containerModalBtn">
            <Typography component="p">
              {!!fullExpenses
                ? `Despesas ${formatNumberToBR(fullExpenses)}`
                : "Despesas - sem valor"}
            </Typography>

            <Buttons text="+ Despesas" handleClick={toggleModalNewExpenses} />
          </Box>

          <Box>
            <Typography component="p">
              {`Saldo total: ${formatNumberToBR(fullRevenues - fullExpenses)}`}
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
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
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
                        <Button
                          size="small"
                          sx={{ ml: 0.4, color: "#131313" }}
                          onClick={() => handleEdit(row.id)}
                        >
                          <BsPencil />
                        </Button>

                        <Button
                          size="small"
                          sx={{ color: "#131313" }}
                          onClick={() => handleDelete(row.id)}
                        >
                          <BsTrash />
                        </Button>
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
        open={openModalNewRevenues}
        toggleOpenedModal={toggleModalNewRevenues}
        title="Adicionar receita"
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

      <ModalBase
        open={openModalNewExpenses}
        toggleOpenedModal={toggleModalNewExpenses}
        title="Adicionar despesas"
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

      <ModalBase
        open={openModalEdit}
        toggleOpenedModal={toggleModalEdit}
        title="Alterando"
        subTitle="Altere os dados abaixo"
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
