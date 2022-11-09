import {
  IconButton,
  InputLabel,
  InputAdornment,
  FormControl,
  OutlinedInput,
} from "@mui/material";

import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const Password = ({
  toggleVisibility = () => {},
  isVisibility = false,
  value = "",
  handleChange = () => {},
  label = "",
  id = "id",
}) => {
  return (
    <FormControl sx={{ width: "100%" }} variant="outlined">
      <InputLabel htmlFor={id}>{label}</InputLabel>

      <OutlinedInput
        id={id}
        type={isVisibility ? "text" : "password"}
        value={value}
        onChange={handleChange}
        fullWidth
        required
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggleVisibility}
              edge="end"
            >
              {isVisibility ? <MdVisibility /> : <MdVisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
    </FormControl>
  );
};

export { Password };
