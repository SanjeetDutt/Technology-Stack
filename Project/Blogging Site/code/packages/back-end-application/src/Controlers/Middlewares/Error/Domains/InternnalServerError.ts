import {_ResponseError} from "./_ResponseError";

export class InternalServerError extends _ResponseError {
	constructor(message?: string, description?:string) {
		super(500, message, description);
	}
}