import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Contactus from "../Pages/Contactus";
import Home from "../Pages/Home";
import Page404 from "../Pages/Page404";
import AccountSettings from "../Pages/AccountSettings";
<<<<<<< HEAD
import ProductDetails from "../Pages/ProductDetails";
import Checkout from "../Pages/Checkout";
import Cart from "../Pages/Cart";
import Wishlist from "../Pages/Wishlist";
import About from "../Pages/About";

=======
import { Registration } from "../Pages/Registration";
import Login from "../Pages/login";
>>>>>>> a6330c3c8a52cd0fb1b651a774c07ab48de1e8b2
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
<<<<<<< HEAD
      { path: "/contacus", element: <Contactus /> },
      { path: "/home", element: <Home /> },
=======
      { path: "contacus", element: <Contactus /> },
      { path: "accountsettings", element: <AccountSettings /> },
      { path: "signup", element: <Registration /> },
      { path: "login", element: <Login /> },
>>>>>>> a6330c3c8a52cd0fb1b651a774c07ab48de1e8b2
      { path: "*", element: <Page404 /> },
      { path: "productdetails", element: <ProductDetails /> },
      { path: "checkout", element: <Checkout /> },
      { path: "/wishlist", element: <Wishlist /> },
      { path: "/about", element: <About /> },

      { path: "cart", element: <Cart /> },
    ],
  },
]);
export default routes;
// 