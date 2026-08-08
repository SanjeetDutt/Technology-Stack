import { ServerError } from "./ServerError";

export class InternalServerError extends ServerError{

    constructor(messsage: string){
        super(500, messsage)
    }
}