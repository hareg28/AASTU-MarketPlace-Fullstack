import {createBrowserRouter} from "react-router-dom"
import Layout from "./Layout";
const routes = createBrowserRouter([
   {
      path: "/",
      element: <Layout />,
      children:[
         

      ]
   }
])
export default routes;