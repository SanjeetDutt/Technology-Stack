import {Router} from "../Middlewares";
import {SignupRequest} from "../DTO";
import {SignupResponse} from "../DTO";

export const userRouter = Router("/user")
userRouter.post<SignupRequest, SignupResponse>("/signup",[],async (req)=>{
	return {
		status:"success"
	}
})