import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Modal,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1.5,
};

const ModalBase = ({
  open = false,
  toggleOpenedModal = () => {},
  title = "",
  subTitle = "",
  textBtn = "Adicionar",
  getDados = () => {},
  children,
}) => {
  return (
    <Modal
      open={open}
      onClose={toggleOpenedModal}
      aria-labelledby={title}
      aria-describedby={subTitle}
    >
      <Card sx={{ ...style }}>
        <CardHeader
          title={title}
          subheader={subTitle}
          action={
            <IconButton
              aria-label={`fechar modal ${title}`}
              onClick={toggleOpenedModal}
            >
              <AiOutlineClose />
            </IconButton>
          }
        />

        <CardContent>{children}</CardContent>

        <CardActions>
          <Button size="small" variant="contained" onClick={() => getDados()}>
            {textBtn}
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

export { ModalBase };
