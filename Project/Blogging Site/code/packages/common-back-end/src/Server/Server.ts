import Express from "express"
import { Router } from "../FileRouter";
import { NotFoundError } from "../Error";
import { Config } from "./config";
import { DefaultConfig } from "./defaultConfig";
import { LoadRouter } from "./LoadRouter";
import { Logger } from "../Logger";

export class Server{

    private readonly _config: Config
    private readonly router: Router
    private readonly expressApplication: Express.Express
    private readonly logger:Logger | undefined

    constructor(p:{config: Config, router: Router}){
        this._config = p.config
        this.router = p.router
        this.expressApplication = Express()
        this.logger = Logger.Builder()
            .setCorelationId("SERVER")
            .setPath(p.config.loggigPath)
            .setTimestamp(new Date())
            .build()
    }

    getExpress(){
        return this.expressApplication
    }

    getLogPath(){
        return this._config.loggigPath
    }

    getServerLogger(){
        return this.logger
    }

    static Builder(){
        return new _ServerBuilder()
    }

    public start(){
        this.logger?.log("Starting the server")
        //Add json and html form url encoddere
        this.expressApplication.use(Express.json())
        this.expressApplication.use(Express.urlencoded({extended: true}))

        //Add endpoints
        const endpoints = this.router.getEndpoint()
        endpoints.forEach(e=>{
            this.logger?.log("Registering the endpoint : " + e.getURL())
            e.register(this)
        })

        // Ading root error boundary for 404
        // this.expressApplication.use(async (req: Express.Request, res: Express.Response, next: Express.NextFunction)=>{
        //     const rootErrorBoundary = this.endpoints[0]?.getRootErrorBoundary()
        //     if(rootErrorBoundary){
        //         const request = RequestBuilder<any, any, any>()
        //             .server(this)
        //             .express(req)
        //             .build()
                
        //         const response = ResponseBuilder()
        //             .express(res)
        //             .request(request)
        //             .build()
                
        //         request.logger.error("Route not found for " + req.path)
        //         const serverError = new NotFoundError(`Endpoint not found`)
        //         await rootErrorBoundary.errorBoundary(serverError,request, response)
        //         request.logger.flush()
        //     } else{
        //         next()
        //     }
        // })

        //listen to a request
        this.expressApplication.listen(this._config!.port,()=>{
            this.logger?.log(`Started the server in port ${this._config.port}`)
            console.log("SERVER IS STARTED ON PORT : " + this._config.port)

            this.logger?.appendLogs("server")
            this.logger?.clearLogs()

            setInterval(()=>{
                this.logger?.appendLogs("server")
                this.logger?.clearLogs()
            }, this._config.loggingIntervalMS)
        })
    }
}

class _ServerBuilder{
    
    private routePath?: string
    private _config?: Config

    public router(path:string){
        this.routePath = path
        return this
    }

    public config(config: Config){
        this._config = config
        return this
    }

    public async server():Promise<void>{

        if(!this.routePath){
            throw new Error("No file routing path is defined")
        }

        const server = new Server({
            config: {
                ...DefaultConfig,
                ...this._config
            },
            router: await LoadRouter(this.routePath)
        })

        server.start()
    }
}