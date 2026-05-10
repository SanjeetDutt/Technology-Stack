import {_ResponseError} from "./_ResponseError";

export class AuthenticationError extends _ResponseError {
	constructor(message: string, description?: string) {
		super(401, message, description);
	}
}