import {Permissions, Router} from "../Middlewares";
import {User} from "../DTO";
import {userService} from "../../Services";

export const userRouter = Router("/user")

userRouter.post<User.Signup.Request, User.Signup.Response>("/signup",[],userService.signup)
userRouter.post<User.Login.Request, User.Login.Response>("/login", [],userService.login)
userRouter.post<{}, {status:boolean}>("/validate-admin",[Permissions.ADMIN],userService.validateToken)