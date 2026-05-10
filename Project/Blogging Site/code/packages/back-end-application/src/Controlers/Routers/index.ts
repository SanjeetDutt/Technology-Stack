import {Router} from "express"
import {UserRouter} from "./UserRouter";

export const AppRouter = Router();

AppRouter.use("/user",UserRouter)


