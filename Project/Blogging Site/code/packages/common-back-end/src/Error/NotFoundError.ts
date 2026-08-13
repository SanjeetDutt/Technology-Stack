import { ServerError } from "./ServerError";

export class NotFoundError extends ServerError{
    constructor(message: string){
        super(404, message)
    }
}