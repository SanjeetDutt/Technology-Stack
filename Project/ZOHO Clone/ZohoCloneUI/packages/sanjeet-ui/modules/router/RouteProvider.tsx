// import {type CreateRouter as CreateRouterType} from "./CreateRouter"
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import type { RouterModule } from "./RouterModule"


type RouteProviderProps = {
    router: RouterModule
}

export const BrowserRouteProvider:React.FC<RouteProviderProps> = ({router})=>{
    const route = createBrowserRouter(router.getRoutes());
    return <RouterProvider router={route} />
}