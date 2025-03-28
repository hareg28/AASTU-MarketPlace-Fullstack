import {createBrowserRouter} from "react-router-dom"
import Layout from "./Layout";
import Contactus from "../Pages/Contactus";
const routes = createBrowserRouter([
   {
      path: "/",
      element: <Layout />,
      children:[
         {path:"/contacus",element:<Contactus />},

      ]
   }
])
export default routes;