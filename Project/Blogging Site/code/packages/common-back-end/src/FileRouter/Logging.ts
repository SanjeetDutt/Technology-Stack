import { ILogging, Logger } from "./FileRouter";

export class Logging
implements ILogging
{

    private readonly corelationId: string
    private readonly logs: {
        level: Logger.LogLevel,
        time: Date
        title: string, 
        description: string
    }[]

    constructor(corelationId: string){
        this.corelationId = corelationId
        this.logs = []
    }

    private addLog(level: Logger.LogLevel, title: string, description: Logger.description){
        this.logs.push({
            level: level,
            time: new Date(),
            title, 
            description
        })
    }

    log(title: string, description: Logger.description) {
        this.addLog("LOG", title, description)
    }
    error(title: string, description: Logger.description) {
        this.addLog("ERROR", title, description)
    }
    info(title: string, description: Logger.description) {
        this.addLog("INFO", title, description)
    }
    warning(title: string, description: Logger.description) {
        this.addLog("WARNING", title, description)
    }

    flush(path: string){
        console.log(this.log)
    }
}