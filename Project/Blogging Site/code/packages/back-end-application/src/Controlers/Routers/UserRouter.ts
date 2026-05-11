import {Router} from "../Middlewares";
import {LoginRequest, LoginResponse, SignupRequest,SignupResponse} from "../DTO";
import {userService} from "../../Services";

export const userRouter = Router("/user")

userRouter.post<SignupRequest, SignupResponse>("/signup",[],userService.signup)
userRouter.post<LoginRequest, LoginResponse>("/login", [],userService.login)