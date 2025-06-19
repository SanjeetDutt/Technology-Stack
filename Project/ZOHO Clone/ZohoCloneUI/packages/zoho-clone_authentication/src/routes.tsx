import {RouteObject} from "react-router-dom";
import {LoginPage} from "./pages/Login"
import {Signup} from "./pages/Signup";


export const AUTHENTICATION_ROUTE:RouteObject[] = [
	{
		id:"login",
		index: true,
		Component: LoginPage
	},
	{
		id:"signup",
		path:"signup",
		Component: Signup
	}
]