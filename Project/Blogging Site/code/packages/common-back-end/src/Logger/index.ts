import { Request } from "../FileRouter";
import fs from "fs/promises"
import path from "path"

type LogLevel = "INFO" | "ERROR" | "WARNING" | "DEBUG" | "LOG"
interface structure{
    title: string,
    description?: string[],
    level: LogLevel
}

export class Logger{
    private readonly request: Request<any, any, any>
    private readonly logPath: string | undefined
    private readonly logStack: structure[]

    constructor(request: Request<any, any, any>, logPath: string|undefined){
        this.request = request
        this.logPath = logPath
        this.logStack = [{
            level:"LOG",
            title:"A new request is initiated with corelation id : " + request.corelationId
        }]
    }

    private addLog(level: LogLevel, title: string, description?: string[]){
        this.logStack.push({level, title, description : description || []})
    }

    log(title: string, ...description: string[]){
        this.addLog("LOG", title, description)
    }

    info(title: string, ...description: string[]){
        this.addLog("INFO", title, description)
    }

    debug(title: string, ...description: string[]){
        this.addLog("DEBUG", title, description)
    }

    error(title: string, ...description: string[]){
        this.addLog("ERROR", title, description)
    }

    warning(title: string, ...description: string[]){
        this.addLog("WARNING", title, description)
    }

    async flush(){
        await this.writeToFile(
            `${this.logPath}/corelations/${this.request.corelationId}.txt`, 
            JSON.stringify(this.logStack, null, 4)
        )
        this.LogInDifferentFile("ERROR","error")
        this.LogInDifferentFile("WARNING","warning")
    }

    private async LogInDifferentFile(logLevel: LogLevel, filename: string){
        const logStacks = this.logStack.filter(log=>log.level === logLevel)

        for(const logStack of logStacks){
            await this.appendToFile(
                `${this.logPath}/${filename}.txt`,
                `${this.request.timestamp.toISOString()} | ${this.request.corelationId} | ${logStack.title}`
            )
        }
    }

    private async writeToFile(addr: string, content: string){
        try{
            const pathName = path.dirname(addr)

            await fs.mkdir(pathName, {recursive: true})

            await fs.writeFile(addr, content, {
                flag:"wx"
            })
        } catch(error){
            console.error("ERROR",error)
        }
    }

    private async appendToFile(addr:string, content: string){
        try{
            await fs.appendFile(addr, content)
        } catch(e){
            console.error("Error while appending to the file ", e)
        }
    }
}