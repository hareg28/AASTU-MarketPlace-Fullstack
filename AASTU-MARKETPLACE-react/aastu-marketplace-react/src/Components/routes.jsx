import {createBrowserRouter} from "react-router-dom"
import Layout from "./Layout";
import Contactus from "../Pages/Contactus";
import Page404 from "../Pages/Page404";
const routes = createBrowserRouter([
   {
      path: "/",
      element: <Layout />,
      children:[
         {path:"/contacus",element:<Contactus />},
         {path:"*", element:<Page404/>}
      ]
   }
])
export default routes;