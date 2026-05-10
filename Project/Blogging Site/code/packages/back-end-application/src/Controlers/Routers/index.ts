import {Router} from "express"
import {userRouter} from "./UserRouter";
import {ApplicationRouter} from "../Middlewares"

export const AppRouter = Router();

const routers: ApplicationRouter[] = [
	userRouter
]
routers.forEach(router =>
	AppRouter.use(router.getPath(), router.getRouter())
)

