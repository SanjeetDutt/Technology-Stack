import crypto from "crypto"

const secreteKey = "SANJEET_ROCKS"
const defaultHeader = {
	alg: "HS256",
	typ: "JWT",
}

/**
 * Generate a JWT token from given payload and optional header object.
 * This includes encryption of header and payload and signing the token
 * @param payload
 * @param header
 */
export function generateJWT (payload: Object, header: Object = defaultHeader) {
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