import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Page404 from "../Pages/Page404";
import AccountSettings from "../Pages/AccountSettings";
import Cart from "../Pages/Cart";
import Checkout from "../Pages/Checkout"; 
import ProductDetails from "../Pages/ProductDetails";
import { CartProvider } from "./CartContext";


const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <CartProvider>
      <Layout />
      </CartProvider>
    ),
    children: [ 
      { path: "accountsettings", element: <AccountSettings /> },
      { path: "*", element: <Page404 /> },
      {path:"cart", element: <Cart />},
      {path:"checkout", element: <Checkout />},
      {path:"productdetails", element: <ProductDetails />},
    ],
  },
]);

export default routes;
