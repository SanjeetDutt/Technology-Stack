import {_ResponseError} from "./_ResponseError";

export class ValidationError extends _ResponseError {
	constructor(message?: string, description?:string) {
		super(400, message, description);
	}
}