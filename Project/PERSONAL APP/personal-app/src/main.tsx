import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {HomeRoute, HomeRouteLayout} from "./routs/HomeRoute.tsx";
import {AdminRoute, AdminRouteLayout} from "./routs/AdminRoute.tsx";

const router = createBrowserRouter([
    {
        path:"/",
        element: <HomeRouteLayout />,
        children:HomeRoute
    },{
        path:"/admin",
        element: <AdminRouteLayout/>,
        children:AdminRoute
    }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
