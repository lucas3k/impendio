import { TextField, Stack, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Inputs } from "../../../shared/components/inputs/Inputs";

const ModalDados = ({
  valueReal = "",
  setValueReal = () => {},
  description = "",
  setDescription = () => {},
  valueDate = "",
  setValueDate = () => {},
}) => {
  return (
    <Box
      component="section"
      sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <Inputs
        label="Valor"
        type="number"
        autoFocus={true}
        value={valueReal}
        handleChange={({ target }) => setValueReal(target.value)}
      />

      <Inputs
        label="Descrição"
        value={description}
        handleChange={({ target }) => setDescription(target.value)}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack>
          <DatePicker
            views={["day", "month", "year"]}
            inputFormat="DD/MM/YYYY"
            label="Data"
            value={valueDate}
            onChange={(e) => setValueDate(e)}
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
          />
        </Stack>
      </LocalizationProvider>
    </Box>
  );
};

export { ModalDados };
