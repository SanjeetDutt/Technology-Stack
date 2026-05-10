import {Router} from "express"
import {ApplicationRouter} from "../Middlewares"

import {userRouter} from "./UserRouter";

// Register you routes here
const routers: ApplicationRouter[] = [
	userRouter
]




// -------------DO NOT TOUCH --------------------//
export const AppRouter = Router();
routers.forEach(router =>
	AppRouter.use(router.getPath(), router.getRouter())
)

