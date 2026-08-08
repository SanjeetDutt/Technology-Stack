import { Endpoint } from "./Endpoint";
import {FileRouter} from "./FileRouter.d"

//Follows tree structure
// SubNode stored in subRoutes
// Each node has its own authentication, error 
// Will add validation in each node
export class Router {
    private readonly path: FileRouter.Path;
    private readonly subRoutes: Router[]
    private authentication?: FileRouter.MethodHandler
    private validation?: FileRouter.MethodHandler
    private error?: FileRouter.ErrorHandler
    private endpoints:{[key in FileRouter.Method]?: Method}

    constructor(path: FileRouter.Path){
        this.path = path
        this.subRoutes = []
        this.endpoints = {}
    }

    public addPath(path: FileRouter.Path){
        const subRoute = new Router(path)
        this.subRoutes.push(subRoute)
        return subRoute
    }

    public addAuth(fn: any){
        this.authentication = fn
    }

    public addValidation(fn:any){
        this.validation = fn
    }

    public addMethod(
        method: FileRouter.Method, 
        fn: FileRouter.MethodHandler, 
        auth?: FileRouter.MethodHandler, 
        error?: FileRouter.ErrorHandler,
        validation?: FileRouter.MethodHandler
    ){
        this.endpoints[method] = new Method(fn, auth, error, validation)
    }

    public addError(fn: any){
        this.error = fn
    }

    public getEndpoints(parentPath?: FileRouter.Path, parentAuth?: any[], parentError?: any, parentValidation?: any[]){
        const url:FileRouter.Path = parentPath && parentPath!=="/" ? `${parentPath}${this.path}` : this.path
        const authArray: any[] = [...parentAuth||[], this.authentication]
        const validationArray: any[] = [...parentValidation || [], this.validation]
        const error:any = this.error || parentError

        let endpoints:Endpoint[] = []

        for(const [methodType, method] of Object.entries(this.endpoints)){

            const auth:FileRouter.MethodHandler[] = [
                ...(authArray ? authArray.filter(a=>!!a) : []),
                ...(method.auth ? [method.auth] : [])
            ]

            const validation: FileRouter.MethodHandler[] = [
                ...(validationArray ? validationArray.filter(v=>!!v) : []),
                ...(method.validation ? [method.validation]:[])
            ]
        
            endpoints.push(new Endpoint({
                handler: method.handler,
                method: methodType as FileRouter.Method, 
                url, 
                auth, 
                error: method.error || error,
                validation
            })
        )}

        if(this.subRoutes){
            this.subRoutes.forEach(r=>{
                endpoints = [
                    ...endpoints,
                    ...r.getEndpoints(
                        url,
                        authArray,
                        error,
                        validationArray
                    )
                ]
            })
        }
        return endpoints
    }
}

class Method{
    public readonly handler: FileRouter.MethodHandler
    public readonly auth: FileRouter.MethodHandler | undefined
    public readonly error: FileRouter.ErrorHandler | undefined
    public readonly validation: FileRouter.MethodHandler | undefined

    constructor(
        handler: FileRouter.MethodHandler, 
        auth?: FileRouter.MethodHandler, 
        error?: FileRouter.ErrorHandler,
        validation?: FileRouter.MethodHandler
    ){
        this.handler = handler
        this.auth = auth
        this.error = error
        this.validation = validation
    }
}