import { Header } from "../../shared/components/header/Header";
import { HelmetTitle } from "../../shared/components/HelmetTitle";

const Dashboard = () => {
  return (
    <>
      <HelmetTitle title="Dashboard" />

      <Header isLogout={true} />

      <h1>Dashboard</h1>
    </>
  );
};

export { Dashboard };
