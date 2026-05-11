import {SignupRequest, SignupResponse, ValidationError} from "../Controlers";
import {ServiceFunction} from "./type";
import {notEmpty, notNull, validEmail, validPassword8Length, hash} from "./Utility";
import {getAllUserByEmail, signupNewUser} from "../Database";

interface IUserService {
	signup: ServiceFunction<SignupRequest, SignupResponse>;
}

function validateSignupRequest ({name, email, password}:SignupRequest) {
	notNull({name, email, password});
	notEmpty({name, email, password});
	validEmail({email})
	validPassword8Length({password})
}

export const userService:IUserService = {
	signup:async (request)=>{
		const {email, password, name} = request.body
		validateSignupRequest(request.body)
		const user = await getAllUserByEmail(email)

		if(user.length > 0){
			throw new ValidationError("User with same email already exists")
		}

		const securePassword =await hash(password)

		await signupNewUser({email, password:securePassword, name})

		return {status:"success"}
	}
};