import { Logger } from "../Logger";

export class Request{
    public readonly corelationId: string
    public readonly logger: Logger

    constructor(params:{
        logPath: string | undefined
    }){
        this.corelationId = crypto.randomUUID()
        this.logger = new Logger(this, params.logPath)
    }
}