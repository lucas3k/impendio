import { toast } from "react-toastify";

const allStyleToastify = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  theme: "dark",
};

const toastifyContainerStyle = {
  ...allStyleToastify,
  pauseOnFocusLoss: false,
  newestOnTop: false,
  rtl: false,
};

const toastifyChildrenStyle = {
  ...allStyleToastify,
  progress: undefined,
};

const Notification = (type = "default", msg = "Notificado!") => {
  return toast[type](mgs, { ...toastifyChildrenStyle });
};

export { Notification, toastifyContainerStyle };
