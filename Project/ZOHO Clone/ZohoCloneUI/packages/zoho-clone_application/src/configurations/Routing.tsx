import {createBrowserRouter, type RouteObject} from "react-router-dom";
import {AUTHENTICATION_ROUTE} from "zoho-clone_authentication"
import {getNamedRoutesMap} from "sanjeet-ui";
const APPLICATION_ROUTING:RouteObject[] = [
	{
		path:"login",
		children: AUTHENTICATION_ROUTE
	}
]

export const ROUTER_NAME = getNamedRoutesMap(APPLICATION_ROUTING)

export const ZohoCloneApplicationRouting = createBrowserRouter(APPLICATION_ROUTING)

