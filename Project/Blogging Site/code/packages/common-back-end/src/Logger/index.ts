import fs from "fs/promises"
import path from "path"

type LogLevel = "INFO" | "ERROR" | "WARNING" | "DEBUG" | "LOG"
interface structure{
    title: string,
    description?: string[],
    level: LogLevel
}

export class Logger{
    static Builder(){
        return new LoggerBuilder()
    }
    private readonly logPath: string
    private readonly logStack: structure[]
    private readonly corelationId: string
    private readonly timestamp: Date

    constructor(logPath: string, corelationId: string, timestamp: Date){
        this.logPath = logPath
        this.corelationId = corelationId
        this.timestamp = timestamp
        this.logStack = []
    }

    private addLog(level: LogLevel, title: string, description?: string[]){
        this.logStack.push({level, title, description : description || []})
    }

    log(title: string, ...description: string[]){
        console.log(this)
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
            `${this.logPath}/corelations/${this.corelationId}.txt`, 
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
                `\n${this.timestamp.toISOString()} | ${this.corelationId} | ${logStack.title}`
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

class LoggerBuilder{
    private location?: string
    private corelationId?: string
    private timestamp?: Date 

    setPath(location?: string){
        if(!location){
            return this
        }
        this.location = location
        return this
    }

    setCorelationId(id: string){
        this.corelationId = id
        return this
    }

    setTimestamp(date: Date){
        this.timestamp = date
        return this
    }

    build(){
        if(!this.location){
            return
        }
        return new Logger(
            this.location, 
            this.corelationId || crypto.randomUUID(), 
            this.timestamp||new Date()
        )
    }
}