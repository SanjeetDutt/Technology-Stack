import { Router } from "../FileRouter/Router";
import Express from "express"

export class Server{

    private readonly port: number
    private readonly router: Router
    private readonly logPath: string|undefined

    constructor(p:{port: number, router: Router, logPath: string|undefined}){
        this.port = p.port
        this.router = p.router
        this.logPath = p.logPath
    }

    public start(){
        // start express
        const application = Express()

        //Add endpoints
        this.router.getEndpoints().forEach(route=>{
            const url = route.getURL()
            const method= route.getMethod()
            route.addLoggerPath(this.logPath)

            switch(method){
                case "POST":
                    application.post(url, async (a,b,c)=>await route.handleRequest(a,b,c))
                case "PUT":
                    application.put(url, async (a,b,c)=>await route.handleRequest(a,b,c))
                case "PATCH":
                    application.patch(url, async (a,b,c)=>await route.handleRequest(a,b,c))
                case "GET":
                    application.get(url, async (a,b,c)=>await route.handleRequest(a,b,c))
                case "DELETE":
                    application.delete(url, async (a,b,c)=>await route.handleRequest(a,b,c))
                
            }
        })
        
        //listen to a post
        application.listen(this.port,()=>{
            console.log("SERVER IS STARTED ON PORT : " + this.port)
        })
    }
}