import {createBrowserRouter} from "react-router-dom";
import {Dashboard} from "../layouts"

export const RoutePath:{[key: string]:string} = {
	admin:"admin",
	employer:"employer",
	employee:"employee",
	dashboard: "dashboard",
}

export const ZohoCloneApplicationRouting = createBrowserRouter([
	{
		index: true,
		element: <Dashboard/>,
		loader:()=><p>Loading</p>
	},{

	}
])