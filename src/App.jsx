import "./App.css";
import { useRoutes } from "react-router-dom";
import { Routers } from "./routers/router";

const App = () => {
  const routing = useRoutes(Routers);
  return routing;
};

export { App };
