import { ServerError } from "./ServerError";

export class UnauthorisedError extends ServerError{

    constructor(message: string){
        super(401, message)
    }
}