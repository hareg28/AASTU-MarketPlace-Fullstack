import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Contactus from "../Pages/Contactus";
import Page404 from "../Pages/Page404";
import AccountSettings from "../Pages/AccountSettings";
import { Registration } from "../Pages/Registration";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "contacus", element: <Contactus /> }, 
      { path: "accountsettings", element: <AccountSettings /> },
      {path: "signup", element:<Registration/>},
      { path: "*", element: <Page404 /> },
    ],
  },
]);

export default routes;
