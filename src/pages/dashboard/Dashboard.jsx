import { Header } from "../../shared/components/header/Header";
import { HelmetTitle } from "../../shared/components/HelmetTitle";
import { api } from "../../shared/services/api/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleClickLogout = () => {
    const token = localStorage.getItem("token");
    localStorage.removeItem("token");

    api
      .post("/logout", {}, { headers: { "x-access-token": token } })
      .finally(() => {
        navigate("/", { replace: true });
      });
  };

  return (
    <>
      <HelmetTitle title="Dashboard" />

      <Header isLogout={true} handleClick={handleClickLogout} />

      <h1>Dashboard</h1>
    </>
  );
};

export { Dashboard };
