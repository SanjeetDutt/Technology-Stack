import {
	AuthenticationError,
	LoginRequest,
	LoginResponse,
	SignupRequest,
	SignupResponse,
	ValidationError,
	notEmpty, notNull, validEmail, validPassword8Length, hash,generateJWTToken
} from "../Controlers";
import {ServiceFunction} from "./type";
import {getAllUserByEmail, signupNewUser} from "../Database";

interface IUserService {
	signup: ServiceFunction<SignupRequest, SignupResponse>;
	login: ServiceFunction<LoginRequest, LoginResponse>;
	validateToken: ServiceFunction<{}, {status:boolean}>;
}

function validateSignupRequest ({name, email, password}:SignupRequest) {
	notNull({name, email, password});
	notEmpty({name, email, password});
	validEmail({email})
	validPassword8Length({password})
}

function validateLoginRequest ({email, password}:LoginRequest) {
	notNull({email, password});
	notEmpty({email, password});
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
	},

	login:async (request)=>{
		const {email, password} = request.body
		validateLoginRequest(request.body)

		const user = await getAllUserByEmail(email)

		if(user.length === 0){
			throw new AuthenticationError("Invalid email")
		}

		const currentUser = user[0]!

		if(!currentUser.passwords || currentUser.passwords.length === 0){
			throw new AuthenticationError("No active password found. Please try to reset password")
		}

		const currentPassword = currentUser.passwords[0]!

		const securePassword = await hash(password)

		if(currentPassword.password !== securePassword){
			throw new AuthenticationError("Invalid password")
		}

		const token = await generateJWTToken(currentUser)

		return{
			status:"success",
			token :token,
			type:"Bearer"
		}
	},

	validateToken: async (request)=>{
		return {
			status:true,
		}
	}
};