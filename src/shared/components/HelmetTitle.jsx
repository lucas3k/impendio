import { Helmet } from "react-helmet-async";

const HelmetTitle = ({ title }) => {
  return (
    <Helmet>
      <title>Impendio - {title}</title>
    </Helmet>
  );
};

export { HelmetTitle };
