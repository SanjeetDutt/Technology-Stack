import {Permissions} from "./Permission";
import {Request, Response, NextFunction} from "express"
import {AuthenticationError} from "../../Error";
import {validateJWTToken} from "./JWTToken";

export const authenticateUserRequest = (permissionNeeded: Permissions[])=>{
	return async (request:Request, response:Response, nextFn:NextFunction)=>{
		if(permissionNeeded.length === 0){
			//No permission check needed. User can access the endpoint without token
			return nextFn()
		}

		const token = request.headers.authorization;

		if (!!token && validateJWTToken(token)){
			return nextFn()
		}

		throw new AuthenticationError("Error while authenticating...")
	}
}