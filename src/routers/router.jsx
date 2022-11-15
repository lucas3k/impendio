import { Login } from "../pages/login/Login";
import { Register } from "../pages/register/Register";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { NotFound } from "../pages/not-found/NotFound";
import { Navigate } from "react-router-dom";

const Auth = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};

const Routers = [
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/dashboard",
    element: (
      <Auth>
        <Dashboard />
      </Auth>
    ),
  },
  { path: "*", element: <NotFound /> },
];

export { Routers };
