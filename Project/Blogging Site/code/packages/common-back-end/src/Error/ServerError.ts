import { IServerError } from "./IServerError";

export class ServerError 
    extends Error 
    implements IServerError 
{
    private readonly status: number
    constructor(status: number, message: string){
        super(message)
        this.status = status
    }
    getCode(): number {
        return this.status
    }
    getMessage(): string {
        return this.message
    }
    
    
}