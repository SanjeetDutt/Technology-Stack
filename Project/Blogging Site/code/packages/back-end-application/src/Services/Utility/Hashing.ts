import crypto from "crypto"

export async function hash(input:string): Promise<string> {
	// const buffer = new TextEncoder().encode(input);
	//
	// const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
	//
	// const hashArray = Array.from(new Uint8Array(hashBuffer));
	// return  hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

	return crypto.createHash("sha256").update(input).digest("hex")
}