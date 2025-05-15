import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";

import Contactus from "../Pages/Contactus";
import Home from "../Pages/Home";


import Page404 from "../Pages/Page404";
import AccountSettings from "../Pages/AccountSettings";
import Cart from "../Pages/Cart";
import Checkout from "../Pages/Checkout"; 
import ProductDetails from "../Pages/ProductDetails";
import { CartProvider } from "./CartContext";




import Wishlist from "../Pages/Wishlist";
import About from "../Pages/About";


import { Registration } from "../Pages/Registration";
import Login from "../Pages/login";




const routes = createBrowserRouter([
  {
    

    element: (
      <CartProvider>
      <Layout />
      </CartProvider>
    ),
    children: [ 

      { path: "accountsettings", element: <AccountSettings /> },
      { path: "signup", element: <Registration /> },
      { path: "login", element: <Login /> },


      { path: "contacus", element: <Contactus /> },
      { path: "accountsettings", element: <AccountSettings /> },
      { path: "signup", element: <Registration /> },
      { path: "login", element: <Login /> },

      { path: "*", element: <Page404 /> },

      
      { path: "/wishlist", element: <Wishlist /> },
      { path: "/about", element: <About /> },

      

      {path:"cart", element: <Cart />},
      {path:"checkout", element: <Checkout />},
      {path:"productdetails", element: <ProductDetails />},

    ],
  },
]);
export default routes;
