import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Contactus from "../Pages/Contactus";
import Page404 from "../Pages/Page404";
import AccountSettings from "../Pages/AccountSettings";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "contacus", element: <Contactus /> }, 
      { path: "accountsettings", element: <AccountSettings /> },
      { path: "*", element: <Page404 /> },
    ],
  },
]);

export default routes;
