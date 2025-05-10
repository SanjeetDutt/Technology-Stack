import type {RouteObject} from "react-router-dom";
import {SampleComponent} from "../components/sample.tsx";

export const HomeRoute:RouteObject[] = [
    {
        path:"/:id",
        element: <SampleComponent />
    }
]

export const HomeRouteLayout = ()=>{
    return <div>THIS IS HOME ROUTE LAYOUT</div>
}