import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Contactus from "../Pages/Contactus";
import Page404 from "../Pages/Page404";
import AccountSettings from "../Pages/AccountSettings";
import ProductDetails from "../Pages/ProductDetails";
import Checkout from "../Pages/Checkout";
import Cart from "../Pages/Cart";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "contacus", element: <Contactus /> }, 
      { path: "accountsettings", element: <AccountSettings /> },
      { path: "*", element: <Page404 /> },
      {path: "productdetails", element: <ProductDetails/>},
      {path: "checkout", element: <Checkout />},
      
      {path: "cart", element: <Cart />},
    ],
  },
]);

export default routes;
