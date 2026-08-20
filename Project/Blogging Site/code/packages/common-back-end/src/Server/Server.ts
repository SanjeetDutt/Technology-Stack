import Express from "express"
import { Router } from "../FileRouter";
import { NotFoundError } from "../Error";
import { Config } from "./config";
import { DefaultConfig } from "./defaultConfig";
import { LoadRouter } from "./LoadRouter";

export class Server{

    private readonly _config: Config
    private readonly router: Router
    private readonly expressApplication: Express.Express

    constructor(p:{config: Config, router: Router}){
        this._config = p.config
        this.router = p.router
        this.expressApplication = Express()
    }

    getExpress(){
        return this.expressApplication
    }

    getLogPath(){
        return this._config.loggigPath
    }

    static Builder(){
        return new _ServerBuilder()
    }

    public start(){
        //Add json and html form url encoddere
        this.expressApplication.use(Express.json())
        this.expressApplication.use(Express.urlencoded({extended: true}))

        //Add endpoints
        const endpoints = this.router.getEndpoint()
        endpoints.forEach(e=>e.register(this))

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

        //listen to a post
        this.expressApplication.listen(this._config!.port,()=>{
            console.log("SERVER IS STARTED ON PORT : " + this._config.port)
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