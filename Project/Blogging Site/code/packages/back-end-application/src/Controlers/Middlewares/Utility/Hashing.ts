import crypto from "crypto"

/**
 * Function to hash the input string into one way encrypted string.
 * Best for password encryption
 * @param input
 */
export async function hash(input:string): Promise<string> {
	return crypto.createHash("sha256").update(input).digest("hex")
}