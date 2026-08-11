
import { LoadRouter } from "../FileRouter";
import {Server as _Server} from "./Server"
class ServerBuilder{
    private port: number | undefined
    private routePath: string | undefined
    private logPath: string | undefined

    public fileRouting(path:string){
        this.routePath = path
        return this
    }

    public listen(port: number){
        this.port = port
        return this
    }

    public logs(path: string){
        this.logPath = path
        return this
    }

    public async start():Promise<void>{

        if(!this.port){
            throw new Error("PORT not defined")
        }

        if(!this.routePath){
            throw new Error("No file routing path is defined")
        }

        const server = new _Server({
            port: this.port,
            endpoints: await LoadRouter(this.routePath),
            logPath: this.logPath
        })

        server.start()
    }
}

export const Server = () => new ServerBuilder()