import { Logger } from "../Logger";
import Express from "express"

export class Request{
    public readonly corelationId: string
    public readonly logger: Logger
    public readonly timestamp: Date

    constructor(params:{
        logPath: string | undefined
        request: Express.Request
    }){
        this.corelationId = crypto.randomUUID()
        this.timestamp = new Date()
        this.logger = new Logger(this, params.logPath)
    }
}