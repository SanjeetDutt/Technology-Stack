import {Router} from "../Middlewares";
import {SignupRequest} from "../DTO";
import {SignupResponse} from "../DTO";
import {userService} from "../../Services";

export const userRouter = Router("/user")

userRouter.post<SignupRequest, SignupResponse>("/signup",[],userService.signup)