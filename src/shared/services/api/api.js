import Axios from "axios";

const url = `https://impendio.up.railway.app`;

const api = Axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

export { api };
