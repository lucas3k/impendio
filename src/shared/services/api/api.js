import Axios from "axios";

const url = `https://impendio.up.railway.app/`;

const token = localStorage.getItem("token");

const api = Axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Authorization: token || "",
  },
});

export { api };