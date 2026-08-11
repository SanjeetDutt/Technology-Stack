import { Logger } from "../Logger";

export class Request{
    public readonly corelationId: string
    public readonly logger: Logger
    public readonly timestamp: Date

    constructor(params:{
        logPath: string | undefined
    }){
        this.corelationId = crypto.randomUUID()
        this.timestamp = new Date()
        this.logger = new Logger(this, params.logPath)
    }
}