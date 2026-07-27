import {Permissions, Router} from "../Middlewares";
import {userService} from "../../Services";

export const userRouter = Router("/user")

userRouter.post("/signup",[],userService.signup)
userRouter.post("/login", [],userService.login)
userRouter.post("/validate-admin",[Permissions.ADMIN],userService.validateToken)