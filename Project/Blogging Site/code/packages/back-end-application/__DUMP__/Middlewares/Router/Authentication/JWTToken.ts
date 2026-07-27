import {UserEntity} from "../../../../Database";
import {roleServices} from "../../../../Services";
import crypto from "crypto";
import {AuthenticationError} from "../../Error";

//--------------------------- TODO: Move it to environment variable
const secreteKey = "SANJEET_ROCKS"
//---------------------------

interface TokenPayload {
	name: string,
	email: string,
	permissions: string[],
	iat: string
}

const tokenHeader = {
	alg: "HS256",
	typ: "JWT",
}

export async function generateJWTToken (user:UserEntity):Promise<string> {
	// Fetch all roles and permission
	const roles = await roleServices.getRoleAndPermissionByUser(user);
	const payload: TokenPayload = {
		name: user.name,
		email: user.email,
		permissions:roles.permissions,
		iat: (new Date()).getTime().toString(),
	}
	return getSignedToken(payload)
}

export function validateJWTToken(token: string) {
	if(!token.startsWith("Bearer")){
		throw new AuthenticationError("Invalid Bearer token");
	}
	const [header, payload, signature] = token.replace("Bearer ","").split(".")
	if(!header || !payload || !signature) {
		throw new AuthenticationError("Invalid token provided")
	}

	const partialToken = `${header}.${payload}`
	const tempSignature = generateSignature(partialToken)

	console.log({tempSignature, signature, partialToken})

	if(tempSignature !== signature) {
		throw new AuthenticationError("Invalid JWT token provided")
	}

	return true
}

function getSignedToken(payload: TokenPayload, header = tokenHeader) {
	const encodedHeader = base64Encode(header)
	const encodedBody = base64Encode(payload)
	const partialToken = `${encodedHeader}.${encodedBody}`

	const signature = generateSignature(partialToken)

	return `${partialToken}.${signature}`
}

function base64Encode (input: Object) {
	return Buffer.from(JSON.stringify(input)).toString('base64')
	.replace(/=/g, '')
	.replace(/\+/g, '-')
	.replace(/\//g, '_');
}

function generateSignature(partialToken:string){
	return crypto.createHmac("sha256", secreteKey).update(partialToken).digest("base64")
	.replace(/=/g, '')
	.replace(/\+/g, '-')
	.replace(/\//g, '_');
}