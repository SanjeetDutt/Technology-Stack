import {Router} from "express"
import {userRouter} from "./UserRouter";
import {authenticate} from "../Middlewares";

export const AppRouter = Router();
AppRouter.use("/user",authenticate([]),userRouter)

