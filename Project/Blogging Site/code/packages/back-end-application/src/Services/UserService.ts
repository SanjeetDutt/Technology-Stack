import {RequestProps, SignupRequest, SignupResponse} from "../Controlers";
import {ServiceFunction} from "./type";

interface IUserService {
	signup: ServiceFunction<SignupRequest, SignupResponse>;
}

class UserService implements IUserService {
	async signup(request: RequestProps<SignupRequest, {}>): Promise<SignupResponse> {
		return {status:"success"}
	}
}

export const userService:IUserService = new UserService();